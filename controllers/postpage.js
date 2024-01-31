const express = require('express');

const posthome = (req, res) => {
    try {
        const selectedCategory = req.body.category;
        res.redirect(`/choice?category=${selectedCategory}`);
    } catch (err) {
        console.log(err);
        res.status(404).send('Error 404: Page not found.');
    }
}


module.exports = {
    posthome,
}

/*
        console.log(selectedCategory);

        console.log(req.body);
*/