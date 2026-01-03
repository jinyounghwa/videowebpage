const CONTENT_DATA = {
    featured: {
        id: 'stranger-things',
        title: 'Stranger Things',
        type: 'series',
        year: 2022,
        rating: '15+',
        duration: '5 시즌',
        match: 98,
        description: '인디애나주의 작은-town에서 사라진 소년. 친구들과 가족들은 그를 되찾기 위해 필사의 노력을 기울이지만, 그 과정에서 더 어두운 비밀들이 드러나기 시작한다.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80',
        backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80',
        genres: ['Sci-Fi', '공포', '드라마'],
        cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'David Harbour', 'Winona Ryder'],
        episodes: 34
    },

    trending: [
        { id: 'stranger-things', title: 'Stranger Things', type: 'series', year: 2022, rating: '15+', duration: '5 시즌', match: 98, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80', genres: ['Sci-Fi', '공포', '드라마'] },
        { id: 'Wednesday', title: 'Wednesday', type: 'series', year: 2022, rating: '15+', duration: '1 시즌', match: 95, image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400&q=80', genres: ['코미디', '미스터리', '판타지'] },
        { id: 'squid-game', title: '오징어 게임', type: 'series', year: 2021, rating: '18+', duration: '1 시즌', match: 97, image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80', genres: ['드라마', 'Survival'] },
        { id: 'the-witcher', title: '더 위치', type: 'series', year: 2019, rating: '18+', duration: '3 시즌', match: 91, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', genres: ['액션', '판타지', '드라마'] },
        { id: 'dark', title: '다크', type: 'series', year: 2017, rating: '16+', duration: '3 시즌', match: 96, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80', genres: ['Sci-Fi', '미스터리', '드라마'] },
        { id: 'breaking-bad', title: '브레이킹 배드', type: 'series', year: 2008, rating: '18+', duration: '5 시즌', match: 99, image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&q=80', genres: ['범죄', '드라마', '스릴러'] },
        { id: 'money-heist', title: '종이의 집', type: 'series', year: 2017, rating: '16+', duration: '5 시즌', match: 93, image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400&q=80', genres: ['액션', '범죄', '드라마'] },
        { id: 'ozark', title: '오자크', type: 'series', year: 2017, rating: '18+', duration: '4 시즌', match: 89, image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80', genres: ['범죄', '드라마', '스릴러'] },
        { id: 'black-mirror', title: '블랙 미러', type: 'series', year: 2011, rating: '18+', duration: '6 시즌', match: 93, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80', genres: ['Sci-Fi', '드라마', '스릴러'] },
        { id: 'the-crown', title: '더 크라운', type: 'series', year: 2016, rating: '13+', duration: '6 시즌', match: 88, image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400&q=80', genres: ['드라마', '역사'] }
    ],

    popularMovies: [
        { id: 'oppenheimer', title: '오펜하이머', type: 'movie', year: 2023, rating: '15+', duration: '3시간 0분', match: 94, image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80', genres: ['드라마', '역사', '스릴러'] },
        { id: 'barbie', title: '바비', type: 'movie', year: 2023, rating: '12+', duration: '1시간 54분', match: 87, image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80', genres: ['코미디', '모험', '판타지'] },
        { id: 'interstellar', title: '인터스텔라', type: 'movie', year: 2014, rating: '12+', duration: '2시간 49분', match: 96, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80', genres: ['Sci-Fi', '어드벤처', '드라마'] },
        { id: 'inception', title: '인셉션', type: 'movie', year: 2010, rating: '12+', duration: '2시간 28분', match: 97, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80', genres: ['Sci-Fi', '액션', '스릴러'] },
        { id: 'the-dark-knight', title: '다크 나이트', type: 'movie', year: 2008, rating: '12+', duration: '2시간 32분', match: 98, image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80', genres: ['액션', '범죄', '드라마'] },
        { id: 'pulp-fiction', title: '펄프 픽션', type: 'movie', year: 1994, rating: '18+', duration: '2시간 34분', match: 96, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80', genres: ['범죄', '코미디', '드라마'] },
        { id: 'parasite', title: '기생충', type: 'movie', year: 2019, rating: '18+', duration: '2시간 12분', match: 95, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80', genres: ['드라마', '스릴러', '코미디'] },
        { id: 'avengers-endgame', title: '어벤저스: 엔드게임', type: 'movie', year: 2019, rating: '12+', duration: '3시간 1분', match: 94, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', genres: ['액션', 'Sci-Fi', '어드벤처'] },
        { id: 'avatar-way-of-water', title: '아바타: 물의 길', type: 'movie', year: 2022, rating: '12+', duration: '3시간 12분', match: 92, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', genres: ['액션', 'Sci-Fi', '어드벤처'] },
        { id: 'top-gun-maverick', title: '탑건: 매버릭', type: 'movie', year: 2022, rating: '12+', duration: '2시간 10분', match: 96, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', genres: ['액션', '드라마'] }
    ],

    tvShows: [
        { id: 'game-of-thrones', title: '왕의 게임', type: 'series', year: 2011, rating: '18+', duration: '8 시즌', match: 95, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', genres: ['액션', '드라마', '판타지'] },
        { id: 'narcos', title: '나르코스', type: 'series', year: 2015, rating: '18+', duration: '3 시즌', match: 92, image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80', genres: ['범죄', '드라마', '역사'] },
        { id: 'mindhunter', title: '마인드헌터', type: 'series', year: 2017, rating: '18+', duration: '2 시즌', match: 90, image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80', genres: ['범죄', '드라마', '스릴러'] },
        { id: 'the-office', title: '더 오피스', type: 'series', year: 2005, rating: '12+', duration: '9 시즌', match: 94, image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80', genres: ['코미디'] },
        { id: 'friends', title: '프렌즈', type: 'series', year: 1994, rating: '12+', duration: '10 시즌', match: 96, image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80', genres: ['코미디', '로맨스'] },
        { id: 'succession', title: '석세션', type: 'series', year: 2018, rating: '18+', duration: '4 시즌', match: 91, image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80', genres: ['드라마'] },
        { id: 'the-bear', title: '더 베어', type: 'series', year: 2022, rating: '18+', duration: '2 시즌', match: 89, image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80', genres: ['드라마', '코미디'] },
        { id: 'the-last-of-us', title: '더 라스트 오브 어스', type: 'series', year: 2023, rating: '18+', duration: '1 시즌', match: 95, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80', genres: ['드라마', '액션'] }
    ],

    action: [
        { id: 'the-matrix', title: '매트릭스', type: 'movie', year: 1999, rating: '15+', duration: '2시간 16분', match: 95, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80', genres: ['Sci-Fi', '액션'] },
        { id: 'john-wick', title: '존 윅', type: 'movie', year: 2014, rating: '18+', duration: '1시간 41분', match: 92, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80', genres: ['액션', '스릴러'] },
        { id: 'mad-max', title: '매드맥스: 분노의 도로', type: 'movie', year: 2015, rating: '18+', duration: '2시간', match: 91, image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400&q=80', genres: ['액션', '어드벤처', 'Sci-Fi'] },
        { id: 'extraction', title: '익스트랙션', type: 'movie', year: 2020, rating: '18+', duration: '1시간 56분', match: 88, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80', genres: ['액션', '스릴러'] },
        { id: 'oldboy', title: '올드보이', type: 'movie', year: 2003, rating: '18+', duration: '2시간', match: 94, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80', genres: ['액션', '드라마', '미스터리'] },
        { id: 'the-revenant', title: '레버넌트: 죽음에서 돌아온 자', type: 'movie', year: 2015, rating: '18+', duration: '2시간 36분', match: 90, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', genres: ['액션', '어드벤처', '드라마'] },
        { id: 'guardians-galaxy', title: '가디언즈 오브 갤럭시', type: 'movie', year: 2014, rating: '12+', duration: '2시간 1분', match: 91, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', genres: ['액션', 'Sci-Fi', '코미디'] },
        { id: 'spider-man-into-the-spider-verse', title: '스파이더맨: 뉴 유니버스', type: 'movie', year: 2018, rating: '12+', duration: '1시간 57분', match: 93, image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80', genres: ['액션', '어드벤처', '애니메이션'] }
    ],

    comingSoon: [
        { id: 'avatar-3', title: '아바타 3', type: 'movie', year: 2024, rating: '예정', duration: '예정', match: null, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80', genres: ['Sci-Fi', '어드벤처', '판타지'] },
        { id: 'dune-2', title: '듄: 파트 투', type: 'movie', year: 2024, rating: '예정', duration: '예정', match: null, image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400&q=80', genres: ['Sci-Fi', '드라마', '어드벤처'] },
        { id: 'stranger-things-5', title: 'Stranger Things 5', type: 'series', year: 2024, rating: '예정', duration: '예정', match: null, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80', genres: ['Sci-Fi', '공포', '드라마'] },
        { id: 'the-witcher-4', title: '더 위치 4', type: 'series', year: 2024, rating: '예정', duration: '예정', match: null, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', genres: ['액션', '판타지', '드라마'] },
        { id: 'wednesday-2', title: 'Wednesday 2', type: 'series', year: 2024, rating: '예정', duration: '예정', match: null, image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400&q=80', genres: ['코미디', '미스터리', '판타지'] }
    ]
};

function getContentById(id) {
    if (CONTENT_DATA.featured.id === id) {
        return CONTENT_DATA.featured;
    }
    const categories = [
        CONTENT_DATA.trending,
        CONTENT_DATA.popularMovies,
        CONTENT_DATA.tvShows,
        CONTENT_DATA.action,
        CONTENT_DATA.comingSoon
    ];
    for (const category of categories) {
        const found = category.find(item => item.id === id);
        if (found) {
            return found;
        }
    }
    return null;
}

function getAllContent() {
    return [
        CONTENT_DATA.featured,
        ...CONTENT_DATA.trending,
        ...CONTENT_DATA.popularMovies,
        ...CONTENT_DATA.tvShows,
        ...CONTENT_DATA.action,
        ...CONTENT_DATA.comingSoon
    ];
}

function getCategories() {
    return {
        trending: 'Netflix 인기 콘텐츠',
        popularMovies: '지금 뜨는 영화',
        tvShows: 'TV 프로그램 인기순',
        action: '액션 & 어드벤처',
        comingSoon: '공개 예정'
    };
}
