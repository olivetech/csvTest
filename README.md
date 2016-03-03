# Warning / Purpose
Obviously, this is a minimalistic implementation of an AngularJS app and a NodeJS server.
You would never want to actually implement either this way. The point is simply to
demonstrate how to implement a client side file download from csv data sent back from
a REST api as a CSV.

If you implement a production system using this project as a template, slap yourself
in the face, then apologize to yourself and the rest of humanity for the pain you have
unleashed upon the world. ;)

# Background
What needs to happen is csv data is sent to the AngularJS single page application.

Once it's there, the client (browser), must then blobify the data from the server
and notify the browser to initiate a download as so the download dialog appears.

This can be done in browsers that support the `window.saveAs` function -- however,
this is not fully cross browser compliant yet. With Safari specifically, it's
know to open a new tab with the blog as its content, which must then be manually
downloaded. This is a lame experience.

Unfortunately, this appears to be a fundamental technical flaw of Safari: https://bugs.webkit.org/show_bug.cgi?id=102914

Workarounds like Downloadify and FireSave.js are hit and miss and can break at any time
with a Safari update.

