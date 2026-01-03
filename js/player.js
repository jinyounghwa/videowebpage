/**
 * Netflix Demo - Video Player Module
 * Handles video playback and player modal interactions
 */

const player = {
    // Current playing content
    currentContent: null,

    // Video element reference
    videoElement: null,

    /**
     * Open player modal with content
     * @param {string} contentId - Content ID to play
     */
    open(contentId) {
        const content = getContentById(contentId);
        if (!content) {
            console.error('Content not found:', contentId);
            return;
        }

        this.currentContent = content;
        this.updatePlayerUI(content);
        this.showModal();
    },

    /**
     * Update player UI with content information
     * @param {Object} content - Content data
     */
    updatePlayerUI(content) {
        const titleEl = document.getElementById('player-title');
        const ratingEl = document.getElementById('player-rating');
        const yearEl = document.getElementById('player-year');
        const durationEl = document.getElementById('player-duration');
        const descriptionEl = document.getElementById('player-description');
        const videoEl = document.getElementById('player-video');

        if (titleEl) titleEl.textContent = content.title;
        if (ratingEl) ratingEl.textContent = content.rating;
        if (yearEl) yearEl.textContent = content.year;
        if (durationEl) durationEl.textContent = content.duration;
        if (descriptionEl) descriptionEl.textContent = content.description;

        // Set video source (using a sample video for demo)
        if (videoEl) {
            // For demo purposes, we'll use a placeholder video
            // In a real app, this would be the actual video URL
            const sampleVideoUrl = this.getSampleVideoUrl(content);
            videoEl.src = sampleVideoUrl;
        }
    },

    /**
     * Get sample video URL for demo
     * @param {Object} content - Content data
     * @returns {string} Video URL
     */
    getSampleVideoUrl(content) {
        // Sample Big Buck Bunny video (open source)
        return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    },

    /**
     * Show player modal
     */
    showModal() {
        const modal = document.getElementById('player-modal');
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.player-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    },

    /**
     * Close player modal
     */
    close() {
        const modal = document.getElementById('player-modal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Stop video playback
        this.pause();

        // Clear current content
        this.currentContent = null;
    },

    /**
     * Start video playback
     */
    play() {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.play().catch(err => {
                console.log('Auto-play prevented:', err);
            });
        }
    },

    /**
     * Pause video playback
     */
    pause() {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.pause();
        }
    },

    /**
     * Toggle play/pause
     */
    togglePlay() {
        const videoEl = document.getElementById('player-video');
        if (!videoEl) return;

        if (videoEl.paused) {
            this.play();
        } else {
            this.pause();
        }
    },

    /**
     * Set video volume
     * @param {number} volume - Volume level (0-1)
     */
    setVolume(volume) {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.volume = Math.max(0, Math.min(1, volume));
        }
    },

    /**
     * Toggle mute
     */
    toggleMute() {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.muted = !videoEl.muted;
        }
    },

    /**
     * Seek to specific time
     * @param {number} time - Time in seconds
     */
    seek(time) {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.currentTime = Math.max(0, time);
        }
    },

    /**
     * Skip forward
     * @param {number} seconds - Seconds to skip
     */
    skipForward(seconds = 10) {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.currentTime = Math.min(videoEl.duration, videoEl.currentTime + seconds);
        }
    },

    /**
     * Skip backward
     * @param {number} seconds - Seconds to skip
     */
    skipBackward(seconds = 10) {
        const videoEl = document.getElementById('player-video');
        if (videoEl) {
            videoEl.currentTime = Math.max(0, videoEl.currentTime - seconds);
        }
    },

    /**
     * Toggle fullscreen
     */
    toggleFullscreen() {
        const container = document.querySelector('.player-video-wrapper');
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        }
    },

    /**
     * Setup player event listeners
     */
    setupEventListeners() {
        const videoEl = document.getElementById('player-video');
        const modal = document.getElementById('player-modal');

        if (!videoEl || !modal) return;

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only handle if player modal is active
            if (!modal.classList.contains('active')) return;

            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.skipForward();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.skipBackward();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.setVolume((videoEl.volume || 1) + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setVolume((videoEl.volume || 1) - 0.1);
                    break;
                case 'm':
                    e.preventDefault();
                    this.toggleMute();
                    break;
                case 'f':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        });

        // Update UI based on video state
        videoEl.addEventListener('timeupdate', () => {
            this.updateProgressBar(videoEl);
        });

        videoEl.addEventListener('volumechange', () => {
            this.updateVolumeIndicator(videoEl);
        });

        videoEl.addEventListener('play', () => {
            this.updatePlayButton(false);
        });

        videoEl.addEventListener('pause', () => {
            this.updatePlayButton(true);
        });

        videoEl.addEventListener('ended', () => {
            this.onVideoEnded();
        });

        videoEl.addEventListener('loadedmetadata', () => {
            this.updateDurationDisplay(videoEl);
        });
    },

    /**
     * Update progress bar
     * @param {HTMLVideoElement} videoEl - Video element
     */
    updateProgressBar(videoEl) {
        const progress = (videoEl.currentTime / videoEl.duration) * 100;
        const progressBar = document.querySelector('.player-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    },

    /**
     * Update volume indicator
     * @param {HTMLVideoElement} videoEl - Video element
     */
    updateVolumeIndicator(videoEl) {
        const muteBtn = document.querySelector('.player-mute-btn');
        if (muteBtn) {
            muteBtn.innerHTML = videoEl.muted
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
        }
    },

    /**
     * Update play button icon
     * @param {boolean} showPlay - Whether to show play icon
     */
    updatePlayButton(showPlay) {
        const playBtn = document.querySelector('.btn-play-large');
        if (playBtn) {
            playBtn.innerHTML = showPlay
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> 재생`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> 일시정지`;
        }
    },

    /**
     * Update duration display
     * @param {HTMLVideoElement} videoEl - Video element
     */
    updateDurationDisplay(videoEl) {
        const durationEl = document.getElementById('player-duration');
        if (durationEl) {
            const minutes = Math.floor(videoEl.duration / 60);
            const seconds = Math.floor(videoEl.duration % 60);
            durationEl.textContent = `${minutes}분 ${seconds}초`;
        }
    },

    /**
     * Handle video ended event
     */
    onVideoEnded() {
        app.showNotification('콘텐츠가 종료되었습니다');
        this.updatePlayButton(true);
    },

    /**
     * Get keyboard shortcuts help
     * @returns {string} Help text
     */
    getShortcutsHelp() {
        return `
            키보드 단축키:
            - 스페이스 / K: 재생/일시정지
            - 오른쪽 화살표: 10초 앞으로
            - 왼쪽 화살표: 10초 뒤로
            - 위쪽 화살표: 볼륨 업
            - 아래쪽 화살표: 볼륨 다운
            - M: 음소거
            - F: 전체화면
            - Esc: 닫기
        `;
    }
};

// Initialize player event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    player.setupEventListeners();
});
