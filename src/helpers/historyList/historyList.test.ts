import HistoryList, { IItemType } from '.'

describe('HistoryList', () => {
  let stack: HistoryList

  beforeEach(() => {
    stack = new HistoryList()
  })

  function assertStack(
    actualStack: HistoryList,
    expectedItems: IItemType[],
    expectedCurrent: number | null
  ) {
    expect(actualStack.items).toEqual(expectedItems)
    expect(actualStack.current).toEqual(expectedCurrent)
  }

  describe('constructor', () => {
    it('sets default initial values correctly', () => {
      const mockStack = new HistoryList()
      assertStack(mockStack, [], null)
    })

    it('sets given initial values correcty', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const initialItems = [item1]
      const initialCurrent = 0
      const mockStack = new HistoryList(initialItems, initialCurrent)
      assertStack(mockStack, initialItems, initialCurrent)
    })
  })

  describe('add', () => {
    it('empty list; should add item', () => {
      const item = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      stack.add(item)

      const expectedItems = [item]
      const expectedCurrent = 0
      assertStack(stack, expectedItems, expectedCurrent)
    })

    it('is equal to the current item; should do nothing', () => {
      const item = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      stack.add(item)

      const expectedItems = [item]
      const expectedCurrent = 0
      assertStack(stack, expectedItems, expectedCurrent)

      stack.add(item)

      assertStack(stack, expectedItems, expectedCurrent)
    })

    it('current item is last item and current item not equal to new item', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const initialItems = [item1]
      const initialCurrent = 0
      const mockStack = new HistoryList(initialItems, initialCurrent)

      const item2 = {
        docType: 'something',
        id: '2',
        title: 'title',
        value: 'two',
      }

      mockStack.add(item2)

      const expectedItems = [item1, item2]
      const expectedCurrent = expectedItems.length - 1
      assertStack(mockStack, expectedItems, expectedCurrent)
    })

    it('new item is equal to next item; should only increment current', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const item2 = {
        docType: 'something',
        id: '2',
        title: 'title',
        value: 'two',
      }
      const initialItems = [item1, item2]
      const initialCurrent = 0
      const mockStack = new HistoryList(initialItems, initialCurrent)

      assertStack(mockStack, initialItems, initialCurrent)
      mockStack.add(item2)
      assertStack(mockStack, initialItems, initialCurrent + 1)
    })

    it('new item not equal to next item; should create a new sub history', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const item2 = {
        docType: 'something',
        id: '2',
        title: 'title',
        value: 'two',
      }
      const initialItems = [item1, item2]
      const initialCurrent = 0
      const mockStack = new HistoryList(initialItems, initialCurrent)

      assertStack(mockStack, initialItems, initialCurrent)

      const item3 = {
        docType: 'something',
        id: '3',
        title: 'title',
        value: 'three',
      }

      mockStack.add(item3)

      const expectedItems = [item1, item3]
      const expectedCurrent = 1
      assertStack(mockStack, expectedItems, expectedCurrent)
    })
  })

  describe('back', () => {
    it('should do nothing if current is null', () => {
      assertStack(stack, [], null)
      stack.back()
      assertStack(stack, [], null)
    })

    it('should do nothing if current is at 0', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const initialItems = [item1]
      const mockStack = new HistoryList(initialItems, 0)
      mockStack.back()
      assertStack(mockStack, initialItems, 0)
    })

    it('should decrement current if more than 1 item in stack', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const item2 = {
        docType: 'something',
        id: '2',
        title: 'title',
        value: 'two',
      }

      const initialItems = [item1, item2]
      const initialCurrent = 1

      const mockStack = new HistoryList(initialItems, initialCurrent)
      mockStack.back()

      const expectedItems = initialItems
      const expectedCurrent = 0
      assertStack(mockStack, expectedItems, expectedCurrent)
    })
  })

  describe('forward', () => {
    it('should do nothing if current is last item', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const initialItems = [item1]
      const mockStack = new HistoryList(initialItems, 0)

      mockStack.forward()

      const expectedItems = initialItems
      const expectedCurrent = 0
      assertStack(mockStack, expectedItems, expectedCurrent)
    })

    it('should increment current', () => {
      const item1 = {
        docType: 'something',
        id: '1',
        title: 'title',
        value: 'one',
      }
      const item2 = {
        docType: 'something',
        id: '2',
        title: 'title',
        value: 'two',
      }
      const initialItems = [item1, item2]
      const mockStack = new HistoryList(initialItems, 0)

      mockStack.forward()

      const expectedItems = initialItems
      const expectedCurrent = 1
      assertStack(mockStack, expectedItems, expectedCurrent)
    })
  })
})
