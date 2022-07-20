export interface IItemType {
  docType: string
  id: string
  title: string
  value: string
  has_smart_doc: boolean
}
class HistoryList {
  public current: number | null
  public items: IItemType[]

  constructor(items: IItemType[] = [], current: number | null = null) {
    this.items = items
    this.current = current
  }

  public add(newItem: IItemType) {
    if (this._isEmpty()) {
      this.items.push(newItem)
      this.current = 0
      return
    }

    if (this._isEqualCurrentItem(newItem)) {
      return
    }

    if (this._isCurrentItemLastItem()) {
      this.items.push(newItem)
      if (this.current !== null) {
        this.current += 1
      }
      return
    }

    if (this._isEqualNextItem(newItem)) {
      if (this.current !== null) {
        this.current += 1
      }
      return
    }

    const newList = this._getListForRevisedHistory(newItem)
    this.items = newList
    this.current = this.items.length - 1
  }

  public back() {
    if (this.current === null || this.current === 0) {
      return
    }
    this.current -= 1
  }

  public forward() {
    if (this._isCurrentItemLastItem()) {
      return
    }
    if (this.current !== null) {
      this.current += 1
    }
  }

  private _getListForRevisedHistory(newItem: IItemType) {
    const newList: IItemType[] = this.items.slice(0)
    if (this.current === null) {
      return []
    }

    const insertAtIndex = this.current + 1
    newList.splice(insertAtIndex, 0, newItem)
    const result: IItemType[] = newList.slice(0, insertAtIndex + 1)

    return result
  }

  private _isEmpty() {
    return this.items.length === 0 || this.current === null
  }

  private _isCurrentItemLastItem() {
    return this.current === this.items.length - 1
  }

  private _isEqualCurrentItem(item: IItemType) {
    if (this.current === null) {
      return false
    }

    const currentItem = this.items[this.current]
    return this._isEqual(currentItem, item)
  }

  private _isEqualNextItem(item: IItemType) {
    if (this.current === null) {
      return false
    }

    const nextItemIndex = this.current + 1

    if (nextItemIndex === this.items.length) {
      return false
    }
    const nextItem = this.items[nextItemIndex]
    return this._isEqual(nextItem, item)
  }

  private _isEqual(a: IItemType, b: IItemType) {
    return a.value === b.value
  }
}

export default HistoryList
