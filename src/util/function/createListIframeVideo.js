export function createListIframeVideo(listPhim, arrIframeVideo) {
  for (let itemVideo of listPhim) {
    const item = itemVideo.trailer.split("=");
    console.log(item[item.length - 1]);
    arrIframeVideo.push(
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${item[item.length - 1]}`}
        title={itemVideo.tenPhim}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    );
  }
  console.log(arrIframeVideo);
}

export function extractVideoId(url) {
  if (!url) {
    return null;
  }
  var regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  var match = url.match(regex);
  return match ? match[1] : null;
}
