var parsePathOrPoints = function (d) {
  if (d.trim()[0].match(/[mlhvcsqta]/i)) {
    return parsePath(d);
  } else {
    return parsePoints(d);
  }
};

var pointsCache = {};

var parsePoints = function (points) {
  var result = pointsCache[points];
  if (result) {
    return result;
  }
  pointsCache[points] = result = [];
  points.trim().split(' ').forEach(function (point) {
    point = point.split(',');
    if (point.length === 2) {
      result.push({
        x: parseFloat(point[0]),
        y: parseFloat(point[1])
      });
    } else {
      result.push(point[0]);
    }
  });
  return result;
};

var pattern_path = /[mlhvcsqtaz][\d.,\-]*/gi;
var pattern_path_points = /-?(\d)+(\.(\d)+)?/g;

var pathCache = {};

var parsePath = function (d) {
  var match = d.trim().match(pattern_path);
  var result = pathCache[d];
  if (result) {
    return result;
  }
  pathCache[d] = result = [];
  if (match) {
    match.forEach(function (seg) {
      var c = seg[0];
      var points = seg.match(pattern_path_points);
      result.push(seg = {
        c: c
      });
      if (points && points.length) {
        points.forEach(function (point, index) {
          points[index] = parseFloat(point);
        });
        switch (c) {
          case 'M':
          case 'm':
          case 'L':
          case 'l':
            seg.x = points[0];
            seg.y = points[1];
            break;
          case 'H':
          case 'h':
            seg.x = points[0];
            break;
          case 'V':
          case 'v':
            seg.y = points[0];
            break;
          case 'C':
          case 'c':
            seg.x1 = points[0];
            seg.y1 = points[1];
            seg.x2 = points[2];
            seg.y2 = points[3];
            seg.x = points[4];
            seg.y = points[5];
            break;
          case 'S':
          case 's':
            seg.x2 = points[0];
            seg.y2 = points[1];
            seg.x = points[2];
            seg.y = points[3];
            break;
          case 'Q':
          case 'q':
            seg.x1 = points[0];
            seg.y1 = points[1];
            seg.x = points[2];
            seg.y = points[3];
            break;
          case 'T':
          case 't':
            seg.x = points[0];
            seg.y = points[1];
            break;
        }
      }
    });
  }
  return result;
};

var parseGradient = function (gradient, g) {
    var result;
    if (gradient.type === 'linear') {
      result = g.createLinearGradient(gradient.x1, gradient.y1, gradient.x2, gradient.y2);
    } else if (gradient.type === 'radial') {
      result = g.createRadialGradient(gradient.fx, gradient.fy, gradient.r / 12, gradient.cx, gradient.cy, gradient.r);
    }
    if (result) {
      gradient.stop && gradient.stop.length && gradient.stop.forEach(function (seg) {
        result.addColorStop(parseFloat(seg.offset), getFilterColor(seg.color, g._color));
      });
    }
  return result;
};
