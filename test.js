const fc = require('fast-check');
const { expect } = require('chai');

// Code under test
function substringMaskify(cc) {
  if(cc.length <= 4){
    return cc
  } if(cc.length > 4){
  let last4Digits = cc.substr(cc.length-4)
  let begin = '#'.repeat(cc.length - 4)
    return `${begin}${last4Digits}`   
  }
}

function regexMaskify(cc) {
  // Original regex was /.(?=(\d*.\d*){4})/g - but that only works for numeric strings
  return cc.replace(/.(?=.{4})/g, '#')
}

// Comment-out the version you don't want to test :-)
//const maskify = substringMaskify;
const maskify = regexMaskify;

// Properties
describe('properties', () => {

  it('masked text should always be the same length as the unmasked source', () => {
    fc.assert(fc.property(fc.string(), (text) => {

        const masked = maskify(text);
        expect(masked.length).to.equal(text.length);
      }));
  });
  
  it('masked text should be the same as unmasked source if length <= 4', ()=>{
    fc.assert(fc.property(fc.string({maxLength: 4}), (text) => {
          
          const masked = maskify(text);
          expect(masked).to.equal(text);
    }));      
  });

  it('last 4 chars should be the same as input if length > 4', ()=>{
    fc.assert(fc.property(fc.string({minLength: 5}), (text) => {
         
          const masked = maskify(text);
          expect(text.substring(text.length - 4 )).to.equal(masked.substring(text.length - 4 ));
    }));  
  });

  it('all but the last 4 chars should be hashes if length > 4', ()=>{
    fc.assert(fc.property(fc.string({minLength: 5}), (text) => {

          const masked = maskify(text);
          expect(masked.substring(0, text.length - 4 )).to.equal("#".repeat(text.length - 4 ));
    }));  
  });

});