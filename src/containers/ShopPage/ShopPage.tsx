import React, { Component, ChangeEvent } from 'react';
import classes from './ShopPage.module.css';
import Button from '../../elements/Button/Button';
import { NavLink } from 'react-router-dom';
import SearchInput from '../../elements/SearchInput/SearchInput';
import ShopCat from '../../components/ShopCat/ShopCat';
import ShopProds from '../../components/ShopProds/ShopProds';
import axios from '../../axios-ck';


class ShopPage extends Component {

    state = {
        View: {
            prodsView: "grid",
            gactive: true,
            lactive: false
        },
        showFilterMenu: false,
        showSortMenu: false,
        products: [],
        loading: false,
        currentPage: 1,
        productsPerPage: 5
    }

    componentDidMount() {
        axios.get("/products")
        .then(res => {
            console.log(res);
            let products = res.data;
            this.setState({products: products});
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
        let searchValue = {wordskey: event.target.value};
        
        axios.post('/find_products_by_words', searchValue)
        .then(res => {
            let searchedProds = res.data;
            this.setState({products: searchedProds});
        })
        .catch(err => {
            console.log(err);
        })
    }

    toggleViewHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "list":
                this.setState({View: {prodsView: "list", lactive: true, gactive: false}});
            break;
            
            case "grid":
                this.setState({View: {prodsView: "grid", gactive: true, lactive: false}});
            break;

            default:
                break;
        }
    }

    filterMenuToggle = () => {
        let filterMenuState = this.state.showFilterMenu;
        this.setState({showFilterMenu: !filterMenuState});
    }

    sortMenuToggle = () => {
        let sortMenuState = this.state.showSortMenu;
        this.setState({showSortMenu: !sortMenuState});

    }

    toFirstPageHandler = () => {
        this.setState({currentPage: 1})
    }


    toBackPageHandler = () => {
        if (this.state.currentPage > 1) {
            let nextPage= this.state.currentPage - 1;
            this.setState({currentPage: nextPage});
        }
    }


    toNextPageHandler = () => {
        if (this.state.currentPage < this.pageNumbers) {
            let backPage= this.state.currentPage + 1;
            this.setState({currentPage: backPage});
        }        
    }


    toLastPageHandler = () => {
        this.setState({currentPage: this.pageNumbers})
        
    }

    pageNumbers = Math.ceil(this.state.products.length / this.state.productsPerPage);


    render() {
        
        let indexOfLastProduct = this.state.currentPage * this.state.productsPerPage;
        let indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
        let currentProducts = this.state.products.slice(indexOfFirstProduct, indexOfLastProduct);
        
        return(
            <div className={classes.ShopPage}>
                <h2>Boutique</h2>
                <SearchInput searchChange={this.handleInputSearch} />
                <div className={classes.CatBtns}>
                    <Button type="catBtn">Parfums</Button>
                    <Button type="catBtn">Make-Up</Button>
                    <Button type="catBtn">Hygiène et Beauté</Button>
                </div>
                <ShopProds 
                view={this.state.View} 
                toggleView={this.toggleViewHandler}
                filterMenuToggle={this.filterMenuToggle} 
                sortMenuToggle={this.sortMenuToggle} 
                showFilters={this.state.showFilterMenu}
                showSorts={this.state.showSortMenu}
                products={currentProducts}
                totalProducts={this.state.products.length}
                productsPerPage={this.state.productsPerPage} 
                currentPage={this.state.currentPage}
                firstPage={this.toFirstPageHandler}
                backPage={this.toBackPageHandler}
                nextPage={this.toNextPageHandler}
                lastPage={this.toLastPageHandler} />
                {/* <ShopCat/> */}
            </div>
        );
    }
}

export default ShopPage;