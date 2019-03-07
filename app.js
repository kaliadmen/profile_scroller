const http = new ezHTTP();

document.getElementById('next').addEventListener('click', function(){
    window.location.reload();
});


function genderGen(gender){
    return gender == 'male' ?
        'female' : 'male';
}

       
http.get('https://randomuser.me/api/')
.then((data) => {
    profile = profileIterator(data.results[0]); 
    nextProfile(profile);
}) ;

//profile iterator
function profileIterator(profile){
    let nextIndex = 0;
    let end = Infinity;
    
    return{
       next: function() {
           let result;
           if (nextIndex <= end) {
               result = { value: profile, done: false }
               return result;
           }
           return { done: true }
       }
    };
}

//next profile display
function nextProfile(){
    const currentProfile = profile.next().value;
    
    document.getElementById('profileDisplay').innerHTML = 
        `<ul class='list-group'>
        <li class="list-group-item">Name: ${currentProfile.name.first} ${currentProfile.name.last}</li>
        <li class="list-group-item">Age: ${currentProfile.dob.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location.city}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${genderGen(currentProfile.gender)}.</li>
        </ul>`
    document.getElementById('imageDisplay').innerHTML = 
        `<img src="${currentProfile.picture.large}">`;
}