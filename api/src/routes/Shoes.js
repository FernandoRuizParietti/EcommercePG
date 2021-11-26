const { Router } = require("express");
const { Shoe, User, Brand, AvaiableSizes, Color } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) =>{
    let Name = req.query.shoeName
        if (Name) {    
            try{
                let paQuery = await Shoe.findAll({
                    include: [{model:Brand},{model:Color}],
                    where:{
                        shoeName:{
                            [Op.iLike]: '%' + Name + '%'}}})
                if (!paQuery.length) {
                    return res.status(404).json('No se encontro el pais que estas buscando')
                }else{
                    return res.json(paQuery)
                }
            }
            catch(errro){
                next(error);
            }
        }
    try{
        const shoesBD = await Shoe.findAll({
            include: [{model:Brand},{model:Color}],
        })
        return res.json(shoesBD)
    }
    catch(error){
        next(error);
    }
    })
    
    router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        let ap = await Shoe.findByPk(id,{
            include: [{model:Brand},{model:Color}]
        })
        return res.send(ap) 
        }
    catch(error){
        next(error)
    }
    })

    router.post('/', async (req,res,next) =>{
        const {
            id, 
            description, 
            stock, 
            shoeName, 
            retailPrice, 
            thumbnail, 
            urlKey,
            avaiableSizeId,
            brandId
        } = req.body;

            if(description && stock && shoeName && retailPrice){
                try{
                    const newShoe = await Shoe.create({
                        id: id,
                        description: description,
                        stock: stock,
                        shoeName: shoeName,
                        retailPrice: retailPrice,
                        thumbnail: thumbnail,
                        urlKey: urlKey,
                        avaiableSizeId:avaiableSizeId,
                        brandId:brandId,
                    });               
                    res.send(newShoe);
                }
                catch(error){
                    next(error)
                }
            }
            else{
                res.status(404).send({msg: "Faltan los valores basicos"})
            }
    }   );

    router.delete('/:id', async function (req, res, next) {
        const {id} = req.params;
        try {
            let existsInDB = await Shoe.findOne({
                where: {
                    id,
                }
            });
            if (existsInDB) {
                Shoe.destroy({
                    where: {
                        id,
                    }
                });
                return res.status(200).send('Shoe has been deleted from database successfully') // lo mismo que updateRecipe, ver si me devuelve en algun lado la receta borrada, 
            }																																										// sino invocar createRecipe() o devolver el id
            else throw new Error('ERROR 500: Shoe with given name does not exist in database')
        } catch (err) {
            next(err)
        }
    });

module.exports = router;