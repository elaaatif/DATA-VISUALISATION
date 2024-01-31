const express = require('express');

const gethome = (req, res) => {
    try {
        res.status(200).render('home');
    } catch (err) {
        res.status(404).send('Error 404: Page not found.');
    }
}

const getindex1 = (req, res) => {
    try {
        res.status(200).render('index1');
    } catch (err) {
        res.status(404).send('Error 404: Page not found.');
    }
}

const getindex2 = (req, res) => {
    try {
        res.status(200).render('index2');
    } catch (err) {
        res.status(404).send('Error 404: Page not found.');
    }
}

// New functions for the 6 categories
const getchoice = (req, res) => {
    try {
        res.status(200).render('choice');
    } catch (err) {
        res.status(404).send('Error 404: Page not found.');
    }
}



module.exports = {
    gethome,
    getindex1,
    getindex2,
    getchoice,
}
