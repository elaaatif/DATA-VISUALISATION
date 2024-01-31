const express = require('express')

const gethome = (req, res) => {
    try {
        res.status(200).render('home');
    } catch (err) {
        console.log(err)
        res.status(404).send('Error 404: Page not found.');
    }
}

const getchoice = (req, res) => {
    try {
        const category = req.query.category;
        res.status(200).render('choice', {category});
    } catch (err) {
        console.log(err)
        res.status(404).send('Error 404: Page not found.');
    }
}

module.exports = {
    gethome,
    getchoice,
}

/*
        console.log('query:')
        console.log(req.query.category)

        
        console.log('Category:')
        console.log(category)
*/