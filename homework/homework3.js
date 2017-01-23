function someTestAlert(message) {
    console.log(message);
}

function printHighScore(response) {
    console.log('High score', response);
}

function testPrintHighScore(response) {
    console.log('Test High score', response);
}

player.showHighScoreList = function(pageToken, isTestMode) {
    isTestMode = isTestMode || false;
    if (isTestMode) {
        var alert = someTestAlert;
        var printHighScore = testPrintHighScore;
    }
    document.querySelector('#highScoreListDiv').innerHTML = '';
    document.querySelector('#highScoreListDiv').style.display = 'block';
    // Create the request.
    LEADERBOARD_ID = document.getElementById('leaderboardIdShowHS').value;
    var request = gapi.client.games.scores.list(
        {leaderboardId: LEADERBOARD_ID,
            collection: 'PUBLIC',
            timeSpan: 'all_time',
            pageToken: pageToken,
            maxResults: '10'});
    request.execute(
        function(response) {
            printHighScore(response);
            if (response.error) {
                alert('Error ' + response.error.code + ': ' + response.message);
                return;
            }
            var root = document.getElementById('highScoreListDiv');
            player.createPlayerList(root, response.items, true);
            if (response.prevPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
            if (response.nextPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
        });
};