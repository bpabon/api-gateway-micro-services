import handlebars from 'handlebars';
import { HandlebarsAdapter } from '../../src/plugins/handlebars.adapter.js';

describe('HandlebarsAdapter', () => {
  describe('compile', () => {
    it('should compile a Handlebars template', () => {
      const templateString = '<h1>{{title}}</h1>';
      const template = HandlebarsAdapter.compile(templateString);

      expect(typeof template).toBe('function');

      const context = { title: 'Hello, World!' };
      const result = template(context);

      expect(result).toBe('<h1>Hello, World!</h1>');
    });
  });
});