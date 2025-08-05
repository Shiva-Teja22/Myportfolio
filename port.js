
    // Draggable function with callback for headphone movement
    function makeDraggable(element, onMove = null) {
      let isDragging = false;
      let offsetX = 0, offsetY = 0;

      const startDrag = (x, y) => {
        isDragging = true;
        element.style.cursor = 'grabbing';
        const rect = element.getBoundingClientRect();
        offsetX = x - rect.left;
        offsetY = y - rect.top;
      };

      const moveDrag = (x, y) => {
        if (isDragging) {
          element.style.left = (x - offsetX) + 'px';
          element.style.top = (y - offsetY) + 'px';
          element.style.transform = 'none';
          if(onMove) onMove(element); // Call callback to update tooltip
        }
      };

      const stopDrag = () => {
        isDragging = false;
        element.style.cursor = 'grab';
      };

      // Mouse
      element.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
      document.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
      document.addEventListener('mouseup', stopDrag);

      // Touch
      element.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
      });
      document.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
      });
      document.addEventListener('touchend', stopDrag);
    }

    // Elements
    const headphone = document.getElementById('headphone');
    const trackNameDiv = document.getElementById('trackName');
    const audio = document.getElementById('bgmusic');
    const source = document.getElementById('audioSource');

    let currentTrack = 0;
    const tracks = [
        {name: "      Headphone \n turn that shit on..!"},
      { file: "simply-meditation-series-11hz-alpha-binaural-waves-for-relaxed-focus-8028.mp3", name: "Meditation Alpha Waves ▶️" },
      { file: "me_low.mp3", name: "Me Low ▶️" },
      { file: "shadows (1).mp3", name: "Shadows ▶️" },
      { file: "Natus - Screaming Silence.mp3", name: "Screaming Silence ▶️" }
    ];

     let workstation= 0;
    const Laptop= [
        {name: "workstation"}
    ];

    // Initial Track Name
    trackNameDiv.textContent = tracks[currentTrack].name;

    // Function to position tooltip above headphone
    function updateTrackNamePosition() {
      const rect = headphone.getBoundingClientRect();
      trackNameDiv.style.left = (rect.left + rect.width/7) + "px";
      trackNameDiv.style.top = (rect.top - 15) + "px"; // above headphone
    }

    // Move name with headphone
    makeDraggable(document.getElementById('laptop'));
    makeDraggable(document.getElementById('alarm'));
    makeDraggable(document.getElementById('headphone'));
    makeDraggable(headphone, updateTrackNamePosition);

    // Initial positioning
    updateTrackNamePosition();

    // Track switch on click
    headphone.addEventListener('click', () => {
      currentTrack = (currentTrack + 1) % tracks.length;
      source.src = tracks[currentTrack].file;
      audio.load();
      audio.play();
      trackNameDiv.textContent = tracks[currentTrack].name;
    });

    // Keep tooltip following headphone even when hovered without drag
    window.addEventListener('resize', updateTrackNamePosition);

    const laptop = document.getElementById('laptop');
const workstationDiv = document.getElementById('workstation');
 const alarm = document.getElementById('a444');
workstationDiv.textContent = "Workstation 💻"; // Tooltip text

function updateWorkstationPosition() {
  const rect = laptop.getBoundingClientRect();
  workstationDiv.style.left = ((rect.left + rect.width/3) - 7) + "px";
  workstationDiv.style.top = (rect.top +27) + "px"; // above laptop
}

// Make laptop draggable and update tooltip
makeDraggable(laptop, updateWorkstationPosition);

// Initial positioning
updateWorkstationPosition();
window.addEventListener('resize', updateWorkstationPosition);
