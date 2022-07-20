export const mockClaims = [
  {
    dependencies: [2, 3],
    id: 1,
    number: 1,
    priorArtsUsed: [['1'], ['1', '2']],
    text:
      'A method of informing users of stock market events comprising the steps of: (a) receiving real-time stock market data on a network of computers;  (b) receiving on thenetwork of computers instructions from a user to specify watch data defining an event, the watch data including a stock market technical analysis request specifying technical analysis formulae to be applied to the real-time stock market data;  (c) usingthe network of computers to periodically apply the user-specified watch data including the stock market technical analysis formulae to the real-time stock market data in real-time to ascertain whether a valid response to the watch data has occurred basedon the real-time stock market data, thereby determining an occurrence of the event defined by the user-specified watch data;  and (d) causing a real-time notification by the network of computers to be provided to the user via a remote communicationsdevice upon the occurrence of the event defined by the user-specified watch data, the real-time notification directed to a remote communications device of the user so that the user can then provide instructions for share market transactions on aninstantaneous basis',
  },
  {
    dependencies: [3],
    id: 2,
    number: 2,
    priorArtsUsed: [['1'], ['2']],
    text:
      'A method as claimed in claim 1, wherein the remote communications device comprises a users fixed or mobile telephone, a personal computing device, a facsimile or pager of the user.',
  },
  {
    dependencies: [],
    id: 3,
    number: 3,
    priorArtsUsed: [['2'], ['1', '3']],
    text:
      'The computer-implemented process of claim 7, wherein the predictive model comprises a computer-implemented neural network having a plurality of interconnected processing elements, each processing element comprising:a plurality of inputs;a plurality of weights, each associated with a corresponding input to generate weighted inputs;combining means, coupled to the weighted inputs, for combining the weighted inputs;  anda transfer function, coupled to the combining means, for processing the combined weighted inputs to produce an output',
  },
]

export const mockPriorArts = {
  '1': {
    detail: 'U.S Patent Number 123',
    link: 'http://www.google.com',
    tag: 'Bernard',
  },
  '2': {
    detail: 'Exhibit 123',
    link: 'http://www.google.com',
    tag: 'Scott',
  },
  '3': {
    detail: 'Exhibit 999',
    link: 'http://www.google.com',
    tag: 'Malone',
  },
  '4': {
    detail: 'Exhibit 10000',
    link: 'http://www.google.com',
    tag: 'Halpert',
  },
  '5': {
    detail: 'U.S Patent number 1,232',
    link: 'http://www.google.com',
    tag: 'Schrute',
  },
  '6': {
    detail: 'Exhibit 234',
    link: 'http://www.google.com',
    tag: 'Johnson',
  },
  '7': {
    detail: 'Exhibit 454',
    link: 'http://www.google.com',
    tag: 'Lublow',
  },
}
