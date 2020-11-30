import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './FilterSort.module.css';
import axios from 'axios';
import {gender, size, category} from './objects';
// import 'bootstrap/dist/css/bootstrap.min.css';

const FilterSort = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productsGender = gender;
    const productsSize = size;
    const productsCategory = category;

    const [checkedItems, setCheckedItems] = useState({});

    const changeHandler = (e) => {
        setCheckedItems({...checkedItems, [e.target.value]: e.target.checked});
    }

    // const genderQuery = Object.keys(checkedItems);

    // let genderParams = genderQuery.map(item => {
    //     return 'gender=' + item;
    // }).join('&')

    // const sizeQuery = Object.keys(checkedItems)
    // let sizeParams = sizeQuery.map(item => {
    //     return 'size=' + item;
    // }).join('&')

    // const categoryQuery = Object.keys(checkedItems)
    // let categoryParams = categoryQuery.map(item => {
    //     return 'category=' + item;
    // }).join('&')

    let query = Object.keys(checkedItems);
    let params = query.map(item => {
        console.log('item' ,item)
        if(productsGender.find(prod => prod.value === item)){
            return 'gender=' + item
        } else if (productsSize.find(prod => prod.value === item)) {
            return 'size=' + item
        } else {
            return 'category=' + item
        }
    }).join('&')

    
    const submitHandler = () => {
        axios.post('/products?' + params)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <FontAwesomeIcon icon="filter" onClick={handleShow}/>
            <Modal show={show} onHide={handleClose} className={classes.Modal}>
                <Modal.Header className={classes.Header}>
                    <Modal.Title className={classes.Title}>Filter & Sort</Modal.Title>
                    <Button variant="secondary" onClick={handleClose} className={classes.Button}>X</Button>
                </Modal.Header>
                <Modal.Body className={classes.Body}>
                    <div className={classes.container}>
                        <ul className={classes.List}>
                        <strong><span>Gender:</span></strong>
                            {productsGender.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler} />{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul className={classes.List}>
                        <strong><span>Size:</span></strong>
                            {productsSize.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler} />{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul className={classes.List}>
                        <strong><span>Category:</span></strong>
                            {productsCategory.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler}/>{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classes.ApplyButton} onClick={submitHandler}>
                        APPLY
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default FilterSort;

