async function toggleMatches(type) {
    const loadingElement = document.getElementById('loading');
    const leaguesContainer = document.getElementById('leagues-container');
    loadingElement.style.display = 'block';
    leaguesContainer.innerHTML = ''; // Clear only the leagues container

    try {
        const response = await fetch(`/matches?type=${type}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        loadingElement.style.display = 'none';
        displayLeagues(data.matches);
        window.scrollTo(0, 0); // Scroll back to the top to keep the header visible
    } catch (error) {
        loadingElement.style.display = 'none';
        console.error('Error fetching match data:', error);
        leaguesContainer.innerHTML = `<p>Error fetching match data. Please try again later.</p>`;
    }
}

function displayLeagues(matches) {
    const leaguesContainer = document.getElementById('leagues-container');
    leaguesContainer.innerHTML = ''; // Ensure only the league container content is updated

    const leagues = groupMatchesByLeague(matches);

    for (const league in leagues) {
        const leagueContainer = document.createElement('div');
        leagueContainer.className = 'league-container';

        const leagueTitle = document.createElement('h2');
        leagueTitle.className = 'league-title';
        leagueTitle.textContent = league;
        leagueContainer.appendChild(leagueTitle);

        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        leagues[league].forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.className = 'match-card';
            matchElement.innerHTML = `
                <h3>${match.homeTeam.name} vs ${match.awayTeam.name}</h3>
                <p>Date: ${new Date(match.utcDate).toLocaleString()}</p>
            `;
            carousel.appendChild(matchElement);
        });

        leagueContainer.appendChild(carousel);
        leaguesContainer.appendChild(leagueContainer);
    }
}

function groupMatchesByLeague(matches) {
    return matches.reduce((leagues, match) => {
        const leagueName = match.competition.name;
        if (!leagues[leagueName]) {
            leagues[leagueName] = [];
        }
        leagues[leagueName].push(match);
        return leagues;
    }, {});
}