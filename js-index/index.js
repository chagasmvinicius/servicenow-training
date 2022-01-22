function exibirVideo(idVideo, urlVideo) {
    let video = document.querySelector(idVideo);
    let videoIn = document.querySelector('#video-in');
    !videoIn ? video.innerHTML = `<iframe width="560" height="315" id="video-in" src="${urlVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : video.innerHTML = '';
}

/* Item de catálogo "Field Service" */

let ic_field_service = document.querySelector('#ic_field_service');
ic_field_service.addEventListener('click', function () { exibirVideo('#video_ic_field_service', 'https://www.youtube.com/embed/9n3-vqRs2gE') });