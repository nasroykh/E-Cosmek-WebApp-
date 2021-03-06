import React from 'react';
import classes from './Prod.module.css';
import ProdImage from '../../../elements/ProdImage/ProdImage';
import Button from '../../../elements/Button/Button';
import Aux from '../../../hoc/Aux';

const prod = (props: any) => {
    let prod;

    switch (props.view) {
        case "grid":
            prod = (
                <div className={classes.ProdGrid}>
                    <ProdImage view={props.view} pimage={props.pimage}/>
                    <div className={classes.ProdInfosGrid}>
                        <p className={classes.PName}>{props.pname}</p>
                        <p className={classes.PBrand}>{props.pbrand}</p>
                        <p className={classes.PPrice}>{props.pprice}</p>
                    </div>
                    <Button type="addBag" />
                </div>
            )
        break;

        case "list":
            prod = (
                <div className={classes.ProdList}>
                    <ProdImage view={props.view}  pimage={props.pimage}/>
                    <div className={classes.ProdInfosList}>
                        <p className={classes.PName}>{props.pname}</p>
                        <p className={classes.PBrand}>{props.pbrand}</p>
                        <p className={classes.PPrice}>{props.pprice}</p>
                    </div>
                    <Button type="addBag" />
                </div>
            )
        break;
        
    
        default:
            break;
    }
    return(
        <Aux>
            {prod}
        </Aux>
    );
}

export default prod;