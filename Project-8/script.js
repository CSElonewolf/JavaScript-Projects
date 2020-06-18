let link = document.getElementById('link');
link.addEventListener('input', function () {
    let str = `${link.value}`;
    let code = str.substring(str.lastIndexOf('/') + 1, str.length)
    console.log(code)
    document.getElementById('thumbnail').src = `https://www.youtube.com/embed/${code}`
})
document.getElementById('submit').addEventListener('click', function () {
    window.alert('After Downloading click back to visit index page')
    if (link.value !== '') {
        location.href = `https://loader.to/api/button/?url=${link.value}=720`
    }
})
