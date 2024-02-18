

const details       = document.querySelectorAll(".novelties__list-link");
const addToBasket   = document.querySelectorAll(".novelties__list-button");
const novelArticle  = document.querySelectorAll(".novelties__list-article");
const novelTitle    = document.querySelectorAll(".novelties__list-title");
const novelText     = document.querySelectorAll(".novelties__list-text");


function hide(obj){
    obj.forEach(item => {
        item.style.display  =  "none";
    })
}
function show(obj){
    obj.forEach(item => {
        item.style.display  =  "block";
    })
}


hide(details);
hide(addToBasket);


// novelTitle.forEach(item => {
//     item.addEventListener('mouseover', (e) => {
//         const target = e.target;
//         target.style.display  =  "none";
       
//         //hide(target);
//         // hide(novelText);
//          show(details);
//          show(addToBasket);
//     } )
// })

novelArticle.forEach(item => {
    item.addEventListener('mouseover', (e) => {
        show(details);
        show(addToBasket);
        hide(novelTitle);
        hide(novelText);
    } )
})

novelArticle.forEach(item => {
    item.addEventListener('mouseout', (e) => {
        hide(details);
        hide(addToBasket);
        show(novelTitle);
        show(novelText);
    } )
})


// novelArticle.forEach((element,i) => {
//     element.addEventListener('mouseover', (e) => {
//         const target = e.target;
//         if (element.childNodes[1] === target || element.childNodes[3]  == target || element.childNodes[5] === target )  {
//             // element.childNodes[3].style.display  =  "none";
//             // element.childNodes[7].style.display  =  "none";
//             console.log(element.childNodes[5]);
//         }
//         } )
// });
