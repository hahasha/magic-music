import * as types from './mutation-types'
import {playMode} from "common/js/config";
import {shuffle} from 'common/js/util'
import {sequenceList} from "./getters";
import {saveSearch, deleteSearch, clearSearch} from "common/js/cache";

export function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}


export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}


export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  //记录当前歌曲
  let currentSong = playList[currentIndex]
  //操作playList
  //查找要插入的歌曲是否存在于播放列表
  let fIndex = findIndex(playList, song)
  currentIndex++
  playList.splice(currentIndex, 0, song)
  //如果存在
  if (fIndex > -1) {
    //如果fIndex小于插入位置,直接删除,否则由于前面插入了一首歌曲，应将索引加1再删除
    if (fIndex < currentIndex) {
      playList.splice(fIndex, 1)
      //由于前面删除了一首歌曲，所以当前播放索引要减1
      currentIndex--
    } else {
      playList.splice(fIndex + 1, 1)
    }
  }

  //操作sequenceList
  //查找当前歌曲在sequenceList中的位置
  let currentIndex1 = findIndex(sequenceList, currentSong) + 1
  let fIndex1 = findIndex(sequenceList, song)
  sequenceList.splice(currentIndex1, 0, song)
  if (fIndex > -1) {
    if (fIndex1 < currentIndex1) {
      sequenceList.splice(fIndex1, 1)
    } else {
      sequenceList.splice(fIndex1 + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

