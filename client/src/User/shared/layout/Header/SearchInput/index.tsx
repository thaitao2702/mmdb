import React, {useState, useCallback} from 'react';

import {SearchIcon} from 'shared/svgs';
import './styles.scss'


const SearchInput = () => {
    const [focus,setFocus] = useState<Boolean>(false);
    const handleFocus = useCallback(() => {
        setFocus((prev) => !prev);
    },[])
    return (
        <div className={`search-input-ctn flex-vertical-center ${focus === true ? 'input-focus' : ''}`}>
            <input onFocus={handleFocus} onBlur = {handleFocus}></input>
            <SearchIcon customStyle={{color:'rgba(0,0,0,0.54)'}}></SearchIcon>
        </div>
    )
}

export default SearchInput;