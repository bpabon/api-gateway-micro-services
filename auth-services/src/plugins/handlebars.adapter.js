import handlebars from 'handlebars';
export class HandlebarsAdapter{
    static compile(string){
        return handlebars.compile(string);
    }
}