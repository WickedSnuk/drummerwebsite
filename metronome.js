// Metronome Class
class Metronome {
    constructor() {
        // Audio Context
        this.audioContext = null;
        this.nextNoteTime = 0.0;
        this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
        this.lookahead = 25.0; // How frequently to call scheduling function (ms)
        this.timerID = null;
        
        // Metronome State
        this.isPlaying = false;
        this.currentBeat = 0;
        this.bpm = 120;
        this.beatsPerMeasure = 4;
        
        // DOM Elements
        this.bpmValue = document.getElementById('bpmValue');
        this.bpmSlider = document.getElementById('bpmSlider');
        this.decreaseBpmBtn = document.getElementById('decreaseBpm');
        this.increaseBpmBtn = document.getElementById('increaseBpm');
        this.startStopBtn = document.getElementById('startStopBtn');
        this.btnText = document.getElementById('btnText');
        this.beatIndicator = document.getElementById('beatIndicator');
        this.beatNumber = document.getElementById('beatNumber');
        this.beatsPerMeasureSelect = document.getElementById('beatsPerMeasure');
        
        this._initializeEventListeners();
    }
    
    _initializeEventListeners() {
        // BPM Controls
        this.bpmSlider.addEventListener('input', (e) => this._updateBPM(parseInt(e.target.value)));
        this.decreaseBpmBtn.addEventListener('click', () => this._changeBPM(-1));
        this.increaseBpmBtn.addEventListener('click', () => this._changeBPM(1));
        
        // Start/Stop
        this.startStopBtn.addEventListener('click', () => this._togglePlayback());
        
        // Time Signature
        this.beatsPerMeasureSelect.addEventListener('change', (e) => {
            this.beatsPerMeasure = parseInt(e.target.value);
            if (this.isPlaying) {
                this.currentBeat = 0;
            }
        });
        
        // Stop metronome when leaving the page
        window.addEventListener('pagehide', () => {
            if (this.isPlaying) {
                this._stop();
            }
        });
        
        window.addEventListener('beforeunload', () => {
            if (this.isPlaying) {
                this._stop();
            }
        });
    }
    
    _updateBPM(newBPM) {
        this.bpm = Math.max(40, Math.min(240, newBPM));
        this.bpmValue.textContent = this.bpm;
        this.bpmSlider.value = this.bpm;
    }
    
    _changeBPM(delta) {
        this._updateBPM(this.bpm + delta);
    }
    
    _togglePlayback() {
        if (!this.isPlaying) {
            this._start();
        } else {
            this._stop();
        }
    }
    
    _start() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        this.isPlaying = true;
        this.currentBeat = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        
        this.startStopBtn.classList.add('active');
        this.btnText.textContent = 'Stop';
        
        this._scheduler();
    }
    
    _stop() {
        this.isPlaying = false;
        
        if (this.timerID) {
            clearTimeout(this.timerID);
            this.timerID = null;
        }
        
        this.startStopBtn.classList.remove('active');
        this.btnText.textContent = 'Start';
        
        this.beatIndicator.classList.remove('active', 'accent');
        this.currentBeat = 0;
        this.beatNumber.textContent = '-';
    }
    
    _scheduler() {
        // Schedule all notes that need to play before the next interval
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this._scheduleNote(this.currentBeat, this.nextNoteTime);
            this._nextNote();
        }
        
        if (this.isPlaying) {
            this.timerID = setTimeout(() => this._scheduler(), this.lookahead);
        }
    }
    
    _scheduleNote(beatNumber, time) {
        // Schedule the visual update slightly before the audio
        const visualDelay = (time - this.audioContext.currentTime) * 1000;
        
        setTimeout(() => {
            if (this.isPlaying) {
                this._updateVisuals(beatNumber);
            }
        }, visualDelay);
        
        // Play the sound
        const isAccent = (beatNumber % this.beatsPerMeasure === 0);
        this._playClick(time, isAccent);
    }
    
    _playClick(time, isAccent) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different frequency for accent (first beat)
        oscillator.frequency.value = isAccent ? 1000 : 800;
        
        gainNode.gain.setValueAtTime(isAccent ? 0.5 : 0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
        
        oscillator.start(time);
        oscillator.stop(time + 0.05);
    }
    
    _updateVisuals(beatNumber) {
        // Update beat number inside circle
        const displayBeat = (beatNumber % this.beatsPerMeasure) + 1;
        this.beatNumber.textContent = displayBeat;
        
        // Visual indicator
        const isAccent = (beatNumber % this.beatsPerMeasure === 0);
        
        this.beatIndicator.classList.remove('active', 'accent');
        
        // Force reflow to restart animation
        void this.beatIndicator.offsetWidth;
        
        if (isAccent) {
            this.beatIndicator.classList.add('accent');
        } else {
            this.beatIndicator.classList.add('active');
        }
        
        // Remove the class after a short duration
        setTimeout(() => {
            this.beatIndicator.classList.remove('active', 'accent');
        }, 100);
    }
    
    _nextNote() {
        // Calculate the length of one beat in seconds
        const secondsPerBeat = 60.0 / this.bpm;
        
        this.nextNoteTime += secondsPerBeat;
        this.currentBeat++;
    }
}

// Initialize metronome when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const metronome = new Metronome();
});
