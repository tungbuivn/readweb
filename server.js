var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);
// var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(httpServer);
var rqUrl = require("url");
var jsdom = require("jsdom");
var cookieJar = jsdom.createCookieJar();

var wdir = path.dirname(process.argv[1]); //"d:\\nodejs\\plunk2";

console.log('Current dir:', wdir);
var domwait = [];
app.use(express.static(wdir));



app.get('*', function(req, res) {
  console.log("ssssssssss");
  res.sendFile(wdir + '/index.html');
  // res.end();
});

function notifyClient(data, res) {
  io.emit('url-data', JSON.stringify({
    id: data.id,
    url: data.url,
    data: res
  }));
}

function fnBrowser(cb) {
  return function(data) {
    jsdom.env({
      url: data.url,
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36",
        Referer: data.url
      },
      scripts: ["http://code.jquery.com/jquery.js"],
      cookieJar: cookieJar,
      done: function(err, window) {
        try {


          var $ = window.$;
          var res = cb($, window, data);
          if (typeof(res.stop) != "undefined") {
            if (domwait.length > 0) domwait.shift();
          } else {
            notifyClient(data, res);
          }
        } catch (ex) {
          console.log("Error:", JSON.stringify(data))
        }


        // console.log(docs);

      }

    });
  }
}

function fnBrowserText(cb) {
  return function(data) {
    var purl = rqUrl.parse(data.url)
    var options = {
      hostname: purl.hostname,
      port: 80,
      path: purl.path,
      method: 'GET',
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36",
        Referer: data.url
      }
    };
    var request = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      var data = "";
      res.on('data', (chunk) => {
        data = data + chunk.toString();
      });
      res.on('end', () => {

        // io.emit('url-data', data);
        jsdom.env(
          data, ["http://code.jquery.com/jquery.js"],
          function(err, window) {
            var $ = window.$;
            res = cb($, window, data);
            notifyClient(data, res);
          }
        );
      });
    });

    request.end();

  }
}

function hixxGetListStories($, window) {
  var docs = [];
  $('.content_block_tin ul li a').each(function() {
    docs.push({
      title: $(this).text(),
      link: $(this).attr("href")
    })

  });
  return {
    items: docs,
    prev: {
      visible: $('.previous').length > 0,
      link: $('.previous a').attr("href") || ""
    },
    next: {
      visible: $('.next').length > 0,
      link: $('.next a').attr("href") || ""
    }
  };
}

function hixxGetListChapters($, window) {
  var docs = [];
  $('.content_block_tin:eq(1) ul li a').each(function() {
    docs.push({
      title: $(this).text(),
      link: $(this).attr("href")
    })

  });
  return {
    items: docs,
    prev: {
      visible: $('.previous').length > 0,
      link: $('.previous a').attr("href") || ""
    },
    next: {
      visible: $('.next').length > 0,
      link: $('.next a').attr("href") || ""
    }
  }

}


function ssGetListStories($, window) {
  var docs = [];
  $('.storylist ul li').find("a:eq(1)").each(function() {
    docs.push({
      title: $(this).text(),
      link: $(this).attr("href")
    })

  });
  var pgstories = $('.storylist').next().next().next();
  var pg = pgstories.find('a');
  var isFirst = pg.first().hasClass('active');
  var isLast = pg.last().hasClass('active');
  var current = pgstories.find('.active');
  return {
    items: docs,
    prev: {
      visible: !isFirst,
      link: (!isFirst ? current.prev().attr("href") : "")
    },
    next: {
      visible: !isLast,
      link: (!isLast ? current.next().attr("href") : "")
    }
  };
}

function ssGetListChapters($, window) {
  var docs = [];
  var chaplist = $('.chaptlist:eq(1) a');
  chaplist.each(function() {
    docs.push({
      title: $(this).text(),
      link: $(this).attr("href")
    })

  });
  var pgstories = $('.chaptlist:eq(1)').next().next();
  var pg = pgstories.find('a');
  var isFirst = pg.first().hasClass('active');
  var isLast = pg.last().hasClass('active');
  var current = pgstories.find('.active');
  return {
    items: docs,
    prev: {
      visible: !isFirst,
      link: (!isFirst ? current.prev().attr("href") : "")
    },
    next: {
      visible: !isLast,
      link: (!isLast ? current.next().attr("href") : "")
    }
  };

}

function ssGetChapterContent($, window, srcdata) {
  var docs = [];
  var items = $('.detail-content').children().splice(2);
  var title = $(items[0]).text();
  var ctx = $(items[1])
  ctx.find('script').remove();

  var np = {
    title: title,
    items: docs,
    stop: true, //prevent send data to client, we will send it manual
    prev: {
      visible: false,
      link: ""
    },
    next: {
      visible: false,
      link: ""
    }
  };
  var prev = $('a:contains(<<):eq(0)');
  if (prev.length > 0) {
    np.prev = {
      visible: true,
      link: $(prev).attr("href")
    }
  }
  var next = $('a:contains(>>):eq(0)');
  if (next.length > 0) {
    np.next = {
      visible: true,
      link: $(next).attr("href")
    }
  }

  var chapId = $($(srcdata.url.split("/")).last()[0].split(".")).first()[0]
  var newUrl = "http://m.sstruyen.com/doc-truyen/index.php?" + $.param({
    ajax: "ct",
    id: chapId
  })
  var ndata = $.extend({}, srcdata, {
    url: newUrl
  });

  // domwait.push(1);
  // return np;

  // function waitCall() {
  // if (domwait.length > 0) {
  //   setTimeout(waitCall, 100);
  //   return;
  // }
  console.log("Run second time", ndata.url)
  fnBrowser(function($, window2) {
      var ctx = $('div:eq(0)');

      if (ctx.find('img').length > 0) {
        docs = $.map(ctx.find('img'), function(it) {
          return $(it).attr('src');
        });
        np.isImage = true;
      } else {
        var regex = /(<([^>]+)>)/ig;
        var text = ctx.html().replace(regex, "\n");
        // console.log(text);
        text = text.replace(/\n+/g, "\n");
        // text = text.replace(/\s+/g, " ");
        docs = text.split("\n");
      }

      np.items = docs;
      np.stop = true;
      notifyClient(srcdata, np);
      return np;
    })(ndata)
    // }
    // setTimeout(waitCall, 10);


  return np;

}



var browserClient = [
  fnBrowser, //0
  fnBrowserText //1
];

var cmds = [
  [0, hixxGetListStories],
  [0, hixxGetListChapters],
  [0, function() {}],
  [0, ssGetListStories],
  [0, ssGetListChapters],
  [0, ssGetChapterContent]
];
for (var i in cmds) {
  cmds[i] = browserClient[cmds[i][0]](cmds[i][1]);
}
var wnd;

io.on('connection', function(socket) {
  wnd = this;
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('get-url', function(data) {
    data = JSON.parse(data);
    console.log(data.id, data.cmd, data.url);
    // var client = http.createClient(80, url);
    // request = client.request();
    cmds[data.cmd](data);
    return;


  });
});

httpServer.listen(3000, function() {
  console.log('listening on *:3000');
});
