import { GamrPage } from './app.po';

describe('gamr App', () => {
  let page: GamrPage;

  beforeEach(() => {
    page = new GamrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
