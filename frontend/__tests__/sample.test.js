// Typically one describe per file
describe('sample test 101', () => {
  // test() and it() are the same thing
  // it.only() (OR fit() (stands for focus it)) will only run that specific test and skip the rest
  // it.skip() (OR xit()) will skip that specific test and run the rest
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it('makes a list of dog names', () => {
    const dogs = ['snickers', 'hugo'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('snickers');
  });
});
