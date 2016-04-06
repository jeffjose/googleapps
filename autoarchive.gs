// Goes through your inbox and archives that are older than the specified time

var data = {
  'updates@bills.mint.com': '3d',
  'info@theinformation.com ': '4d',
  'membership@stratechery.com': '7d',
  'calendar-notification@google.com': '1d',
  'security@facebookmail.com': '2d',
  'notify@twitter.com': '3h',
  'jobs-listings@linkedin.com': '4d',
  'support@groupme.com': '2d',
  'info@firmsconsulting.com': '7d',
  'venmo@venmo.com': '1d',
  'noreply@facebookmail.com': '2h',
  'info@twitter.com': '1d',
}

 
function main() {

    for (var email in data) {

        if (!data.hasOwnProperty(email)) continue;

        var ttl = data[email];
      
        Logger.log('Processing ' + email);

        // Get threads that are older than `ttl`
        var query = '(from:' + email + ' OR replyto:' + email + ') older_than:' + ttl + ' in:inbox';
      
        var threads  = GmailApp.search(query);

        threads.forEach( function (thread, i) {
            Logger.log(email + ': ' + i);
            thread.moveToArchive();
        
        });
    }
}
