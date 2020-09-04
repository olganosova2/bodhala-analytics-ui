import { SafePipe } from './safe.pipe';
import {async, TestBed, inject} from '@angular/core/testing';
import {PROVIDERS} from '../unit-tests/mock-app.imports';
import {DomSanitizer} from '@angular/platform-browser';
import {SecurityContext} from '@angular/core';

describe('SafePipe', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: PROVIDERS
    }).compileComponents();
  }));
  it('create an instance SafePipe', () => {
    // const san =
    const pipe = new SafePipe(null);
    expect(pipe).toBeTruthy();
  });
  it('should transform html', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafePipe(service);
    const result = pipe.transform('Hello', 'html');
    const sanitizedValue = service.sanitize(SecurityContext.HTML, result);
    expect(sanitizedValue).toBe('Hello');
  }));
  it('should transform style', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafePipe(service);
    const result = pipe.transform('<style>Hello</style>', 'style');
    const sanitizedValue = service.sanitize(SecurityContext.STYLE, result);
    expect(sanitizedValue).toBe('<style>Hello</style>');
  }));
  it('should transform url', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafePipe(service);
    const result = pipe.transform('http://www.google.com', 'url');
    const sanitizedValue = service.sanitize(SecurityContext.URL, result);
    expect(sanitizedValue).toBe('http://www.google.com');
  }));
  it('should transform script', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafePipe(service);
    const result = pipe.transform('<script>Hello</script>', 'script');
    const sanitizedValue = service.sanitize(SecurityContext.SCRIPT, result);
    expect(sanitizedValue).toBe('<script>Hello</script>');
  }));
  it('should transform resourceUrl', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafePipe(service);
    const result = pipe.transform('<script>Hello</script>', 'resourceUrl');
    const sanitizedValue = service.sanitize(SecurityContext.RESOURCE_URL, result);
    expect(sanitizedValue).toBe('<script>Hello</script>');
  }));
});
