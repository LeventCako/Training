import { useState } from 'react';



function Header() {


    return (<>
        <div className='header'>
        <h1>zalando</h1>
            <div className='header-buttons'>
              
                <button title='Language'><img height={10} src="src/assets/language.webp"/></button>
                <button title='Profile'><img height={10} width={10} src='src/assets/profile.webp'></img></button>
                <button title='Favourites'><img height={10} src="src/assets/heart.webp"/></button>
            </div>
            <input className='searchbar' type='search' placeholder='search...'></input>
            <button title='search' className='searchicon'>🔎</button>
        </div>
       

    </>)
}


export default Header;