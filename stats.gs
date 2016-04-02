var LIMIT = '14d'
var QUERY = '((is:unread AND in:inbox) OR is:starred) AND newer_than:' + LIMIT
var EMAIL = 'jeffjose@wharton.upenn.edu'

function main() {

  // Mark all the old mailstats emails as read, and archive them
  var mailstats = GmailApp.search('[mailstats]')
  mailstats.forEach( function (thread, i) {
    thread.moveToArchive();
  });

  // Get threads that match the query.
  var threads  = GmailApp.search(QUERY);
  var messages = GmailApp.getMessagesForThreads(threads);

  var starred  = [];
  var unread   = [];
  var starredunread = [];

  // Find threads that are starred and unread
  threads.forEach( function (thread, i) {

    if (thread.hasStarredMessages()) {
      starred.push(thread);
    };

    if (thread.isUnread()) {
      unread.push(thread);
    }
  
  });

  // From the starred ones, find that are unread.
  starred.forEach (function (thread, i) {

    if (thread.isUnread()) {
      starredunread.push(thread)
    }
  
  });

  // Send email
  GmailApp.sendEmail(EMAIL, '[mailstats] ✉' + unread.length + ' ★' + starredunread.length + ' (' + starred.length + ')', '.');

  // Mark the new email as read
  // This migth not work because GmailApp.search doesnt recognize the email that was sent in the line before. 
  // Setup a filter to (in Gmail) to listen to 'mailstats' and mark as read.
  // We mark it as read so that Android App wont notify you of this email.
  var mailstats = GmailApp.search('[mailstats] AND is:unread')
  mailstats.forEach( function (thread, i) {
    thread.markRead();
  });

}
