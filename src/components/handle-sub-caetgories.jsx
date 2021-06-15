import React, {useState} from 'react'

const furniture = {
    placeholder:'תת קטגוריה',
    bed: 'מיטה',
    desk:'שולחן עבודה',
    couch:'ספה',
    chair:'כסא' ,
    closet:'ארון' ,
    drawers: 'מגירות',
    shelf: 'מדף',
    carpet: 'שטיח'
};
const computers = {
    laptop: 'מחשב נייד',
    pc:'מחשב נייח',
    mouse:'עכבר',
    keyboard:'מקלדת' ,
    tablet:'טבלט' ,
    cellphone: 'טלפון נייד',
    earphones: 'אוזניות'
};

const electronics = {
    refrigerator: 'מקרר',
    washingmachine: 'מכונת כביסה',
    dishwasher: 'מדיח כלים',
    light: 'תאורה',
    tv: 'טלויזיה'
};
const other = {
    makeup: 'איפור',
    cannedfood: 'אוכל משומר',
    clothes: 'בגדים',
    kitchen: 'כלי מטבח',
    bicycles: 'אופניים',
    tools:'כלי עבודה'
};

const SubCategories = (props) => {

    const {productType, subProductType, setSubProductType} = props;
    let categories = []
    switch (productType) {
        case 'furniture':
            categories = Object.entries(furniture).map(([k, v]) => ({
                key:k,
                value: v
            }));
            break;

        case 'computers':
            categories = Object.entries(computers).map(([k, v]) => ({
                key:k,
                value: v
            }));
            break;

        case 'electronics':
            categories = Object.entries(electronics).map(([k, v]) => ({
                key:k,
                value: v
            }));
            break;

        case 'other':
            categories = Object.entries(other).map(([k, v]) => ({
                key:k,
                value: v
            }));
            break;

        default: break;
    }

    return (
        <select className="product-options" name="subProductType" value={subProductType}
                onChange={(e) => setSubProductType(e.target.value)}>
            {categories.map(({value}) => <option value={value}>{value}</option>)}
        </select>
    );

}


export default SubCategories
