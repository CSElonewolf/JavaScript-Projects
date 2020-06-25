export default{
    search: function(searchterm,sortby,limit){
        return fetch(`http://www.reddit.com/search.json?q=${searchterm}&sort=${sortby}&limit=${limit}`)
        .then(response => response.json())
        .then(data => data.data.children.map(data=>data.data))
    }
}