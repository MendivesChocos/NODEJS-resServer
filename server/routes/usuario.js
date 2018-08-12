const express = require('express');
const app = express();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', function (req, res) {
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 5;

    Usuario.find({ estado : true })
            .skip(desde)
            .limit(limit)
            .exec((err, usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err: err
                    })
                }

                Usuario.count({estado : true}, (err, count) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: count
                    })
                })
            })
})
  
app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.correo,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    })

    usuario.save((err, usuarioDB)=> {
        try {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }
    
            res.json({
                ok: true,
                usuario: usuarioDB
            }) 
        } catch (e) {

        }
        
    })

})
  
app.put('/usuario/:id', function (req, res) {
    
    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })
})

app.delete('/usuario/:id', function(req, res) {
    const id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioDelete) =>{
    const stateChange = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, stateChange, { new: true }, (err, usuarioDelete) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        if (!usuarioDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDelete
        })
    })
})

module.exports = app;