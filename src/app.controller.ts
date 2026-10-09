import { Body, Controller, Get, Query, Render, Post, } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './data/data.js';
import { CreateProductDto } from './data/CreateProduct.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  adatok: Product[] = [
    {
      "name": "Vezeték nélküli egér",
      "category": "elektronika",
      "price": 8990,
      "stock": 12
    },
    {
      "name": "Programozás kezdőknek",
      "category": "könyv",
      "price": 6490,
      "stock": 4
    },
    {
      "name": "Mechanikus billentyűzet",
      "category": "elektronika",
      "price": 24990,
      "stock": 3
    },
    {
      "name": "Fekete kapucnis pulóver",
      "category": "ruházat",
      "price": 12990,
      "stock": 8
    },
    {
      "name": "Catan társasjáték",
      "category": "játék",
      "price": 11990,
      "stock": 0
    },
    {
      "name": "USB-C töltőkábel",
      "category": "elektronika",
      "price": 4990,
      "stock": 25
    },
    {
      "name": "Adidas sportcipő",
      "category": "ruházat",
      "price": 27990,
      "stock": 2
    },
    {
      "name": "A kis herceg",
      "category": "könyv",
      "price": 3990,
      "stock": 15
    },
    {
      "name": "LEGO City rendőrségi állomás",
      "category": "játék",
      "price": 34990,
      "stock": 5
    },
    {
      "name": "Bluetooth hangszóró",
      "category": "elektronika",
      "price": 15990,
      "stock": 7
    }
  ]

  @Get('/')
  @Render('index')
  termeklista() {
    return {
      adatok: this.adatok
    }
  }

  @Get('/filter')
  @Render('filter')
  szuresLista(@Query('category') category: string ){
      if (!category){
        return{
          adatok: this.adatok.toSorted((a,b) => b.stock-a.stock)
        }
      } else{
        return{
          adatok: this.adatok.filter(elem => elem.category == category).toSorted((a,b) => b.stock - a.stock)

        }
      }

      
      
  }

  @Get('/new')
  @Render('new')
  ujTermekLista(){
    return{
      data: this.adatok
    }
  }
  
  @Post("/new")
  @Render("new")
  ujTermek(@Body()body: CreateProductDto){

    if (!body.name || !body.category || !body.price || !body.stock) {
      return {
        error: "Nincs megadva mind a négy mező",
        success: false,
        arcitcle: body
      }
    }

    const newProduct : Product = {
      name: body.name,
      category: body.category,
      price:  parseInt(body.price),
      stock: parseInt(body.stock)
    } 

    this.adatok.push(newProduct)
    return {
      error: "",
      success: true
    }
  }

  @Get('/stats')
  @Render('stats')
  statisztikak(){
    let darabszam = 0;
    let osszAr = 0
    let legdragabbAr = this.adatok[0].price;
    let legolcsobbAr = this.adatok[0].price
    this.adatok.forEach(e => {
      darabszam+=e.stock
      osszAr+=e.price
      if(e.price > legdragabbAr){
        legdragabbAr = e.price
      }
      if(e.price < legolcsobbAr){
        legolcsobbAr = e.price
      }
    })
    let atlagar = Math.round(osszAr/this.adatok.length);
    
    return{

      adatok: this.adatok, darabszam, atlagar, legdragabbAr, legolcsobbAr

    }
  }
}
