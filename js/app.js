const app = {
    myList: [],

    init() {
        this.renderAllContent();
        this.setupEventListeners();
        this.setupHeaderScroll();
        this.setupKeyboardNavigation();
        this.setupNavigation();
        this.updateHero();
    },

    updateHero() {
        const featured = CONTENT_DATA.featured;
        const heroBackground = document.querySelector('.hero-background');
        const heroDescription = document.querySelector('.hero-description');
        const playBtn = document.querySelector('.btn-play');
        const infoBtn = document.querySelector('.btn-info');

        if (heroBackground) {
            heroBackground.style.backgroundImage = `linear-gradient(to right, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.6) 50%, rgba(20, 20, 20, 0.1) 100%), url('${featured.backdrop}')`;
        }
        if (heroDescription) {
            heroDescription.textContent = featured.description;
        }
        if (playBtn) {
            playBtn.onclick = () => player.open(featured.id);
        }
        if (infoBtn) {
            infoBtn.onclick = () => this.showInfo(featured.id);
        }
    },

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.textContent.trim();
                
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                this.switchView(view);
            });
        });
    },

    switchView(viewName) {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        mainContent.innerHTML = '';
        mainContent.style.marginTop = '20px';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (viewName === '홈') {
            mainContent.style.marginTop = '-100px';
            mainContent.innerHTML = `
                <section class="content-row">
                    <h2 class="row-title">Netflix 인기 콘텐츠</h2>
                    <div class="content-slider" id="trending"></div>
                </section>
                <section class="content-row">
                    <h2 class="row-title">지금 뜨는 영화</h2>
                    <div class="content-slider" id="popular-movies"></div>
                </section>
                <section class="content-row">
                    <h2 class="row-title">TV 프로그램 인기순</h2>
                    <div class="content-slider" id="tv-shows"></div>
                </section>
                <section class="content-row">
                    <h2 class="row-title">액션 & 어드벤처</h2>
                    <div class="content-slider" id="action"></div>
                </section>
                <section class="content-row">
                    <h2 class="row-title">공개 예정</h2>
                    <div class="content-slider" id="coming-soon"></div>
                </section>
            `;
            this.renderAllContent();
            this.rebindSliderEvents();
            return;
        }

        let filteredContent = [];
        let title = '';

        if (viewName === '시리즈') {
            filteredContent = getAllContent().filter(item => item.type === 'series');
            title = 'TV 프로그램';
        } else if (viewName === '영화') {
            filteredContent = getAllContent().filter(item => item.type === 'movie');
            title = '영화';
        } else if (viewName === 'NEW! 요즘 대세 콘텐츠') {
            filteredContent = CONTENT_DATA.trending;
            title = 'NEW! 요즘 대세 콘텐츠';
        } else if (viewName === '내가 찜한 리스트') {
            filteredContent = this.myList;
            title = '내가 찜한 리스트';
        }

        this.renderSingleView(title, filteredContent);
        this.rebindSliderEvents();
    },

    rebindSliderEvents() {
        document.querySelectorAll('.content-slider').forEach(slider => {
            slider.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    e.preventDefault();
                    slider.scrollLeft += e.deltaX;
                }
            }, { passive: true });
        });
    },

    renderSingleView(title, content) {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const section = document.createElement('section');
        section.className = 'content-row';
        section.innerHTML = `
            <h2 class="row-title">${title}</h2>
            <div class="content-slider" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; overflow: visible;">
                ${content.length > 0 ? content.map(item => this.createContentCard(item)).join('') : '<p style="color: #808080; padding: 20px;">콘텐츠가 없습니다.</p>'}
            </div>
        `;
        mainContent.appendChild(section);
    },

    renderAllContent() {
        this.renderContentRow('trending', CONTENT_DATA.trending);
        this.renderContentRow('popular-movies', CONTENT_DATA.popularMovies);
        this.renderContentRow('tv-shows', CONTENT_DATA.tvShows);
        this.renderContentRow('action', CONTENT_DATA.action);
        this.renderContentRow('coming-soon', CONTENT_DATA.comingSoon);
    },

    renderContentRow(elementId, content) {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = content.map(item => this.createContentCard(item)).join('');
    },

    createContentCard(item) {
        const matchHtml = item.match !== null
            ? `<span class="content-card-match">${item.match}% 일치</span>`
            : '';

        const ageHtml = item.rating !== '예정' && item.rating !== '예정 등급'
            ? `<span class="content-card-age">${item.rating}</span>`
            : '';

        return `
            <div class="content-card"
                 onclick="player.open('${item.id}')"
                 onmouseenter="this.querySelector('.content-card-overlay').style.opacity = '1'"
                 onmouseleave="this.querySelector('.content-card-overlay').style.opacity = '0'">
                <img src="${item.image}"
                     alt="${item.title}"
                     class="content-card-image"
                     loading="lazy">
                <div class="content-card-overlay">
                    <h3 class="content-card-title">${item.title}</h3>
                    <div class="content-card-meta">
                        ${matchHtml}
                        <span>${item.year}</span>
                        ${ageHtml}
                        <span>${item.duration}</span>
                    </div>
                    <div class="content-card-buttons">
                        <button class="content-card-btn play"
                                onclick="event.stopPropagation(); player.open('${item.id}')"
                                title="재생">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </button>
                        <button class="content-card-btn"
                                onclick="event.stopPropagation(); app.addToList('${item.id}')"
                                title="내 리스트에 추가">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <button class="content-card-btn"
                                onclick="event.stopPropagation(); app.showInfo('${item.id}')"
                                title="상세 정보">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                player.close();
                this.closeInfo();
            }
        });

        this.rebindSliderEvents();
    },

    setupHeaderScroll() {
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (document.querySelector('.player-modal.active') ||
                document.querySelector('.info-modal.active')) {
                return;
            }

            const activeSlider = document.querySelector('.content-slider:hover');
            if (activeSlider && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                const scrollAmount = e.key === 'ArrowLeft' ? -200 : 200;
                activeSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    },

    showInfo(contentId) {
        const content = getContentById(contentId);
        if (!content) return;

        const infoModal = document.getElementById('info-modal');
        const infoContent = document.getElementById('info-content');

        const matchHtml = content.match !== null
            ? `<span style="color: #46d369; font-weight: 600;">${content.match}% 일치</span>`
            : '';

        infoContent.innerHTML = `
            <div class="info-header">
                <h2 class="info-title">${content.title}</h2>
                <div class="info-meta">
                    ${matchHtml}
                    <span>${content.year}</span>
                    <span>${content.rating}</span>
                    <span>${content.duration}</span>
                </div>
            </div>
            <p class="info-description">${content.description || '이 콘텐츠에 대한 상세 정보가 없습니다.'}</p>
            <div style="margin-top: 20px;">
                <p style="font-size: 14px; color: #b3b3b3; margin-bottom: 8px;">
                    <strong style="color: #fff;">장르:</strong> ${content.genres ? content.genres.join(', ') : '미지정'}
                </p>
                ${content.cast ? `
                <p style="font-size: 14px; color: #b3b3b3;">
                    <strong style="color: #fff;">출연:</strong> ${content.cast.join(', ')}
                </p>
                ` : ''}
            </div>
        `;

        infoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeInfo() {
        const infoModal = document.getElementById('info-modal');
        infoModal.classList.remove('active');
        document.body.style.overflow = '';
    },

    addToList(contentId) {
        const content = getContentById(contentId);
        if (!content) return;

        if (this.myList.some(item => item.id === contentId)) {
            this.showNotification('이미 내 리스트에 있습니다');
            return;
        }

        this.myList.push(content);
        this.showNotification('내 리스트에 추가됨');

        const cards = document.querySelectorAll('.content-card');
        cards.forEach(card => {
            const btn = card.querySelector('.content-card-btn:nth-child(2)');
            if (btn) {
                btn.style.borderColor = '#46d369';
                btn.style.backgroundColor = 'rgba(70, 211, 105, 0.2)';
            }
        });
    },

    showNotification(message) {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #46d369;
            color: #000;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 600;
            z-index: 3000;
            animation: fadeInUp 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    search(query) {
        if (!query.trim()) return;

        let allContent = [];
        try {
            if (typeof getAllContent === 'function') {
                allContent = getAllContent();
            } else {
                console.error('getAllContent is not defined in global scope');
            }
        } catch (e) {
            console.error('Error fetching all content:', e);
        }
        
        const results = allContent.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.genres && item.genres.some(g => g.toLowerCase().includes(query.toLowerCase())))
        );

        if (results.length > 0) {
            this.showSearchResults(results, query);
        } else {
            this.showNotification('검색 결과가 없습니다');
        }
    },

    showSearchResults(results, query) {
        const modal = document.createElement('div');
        modal.className = 'player-modal active';
        modal.innerHTML = `
            <div class="player-overlay" onclick="this.parentElement.remove()"></div>
            <div class="player-container" style="max-height: 80vh; overflow-y: auto;">
                <button class="player-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div style="padding: 24px;">
                    <h2 style="margin-bottom: 20px;">"${query}" 검색 결과 (${results.length})</h2>
                    <div class="content-slider" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                        ${results.map(item => this.createContentCard(item)).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }
};

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
