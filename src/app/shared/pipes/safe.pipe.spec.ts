import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    // const san =
    const pipe = new SafePipe(null);
    expect(pipe).toBeTruthy();
  });
});
