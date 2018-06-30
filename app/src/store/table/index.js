import http from '../../utils/network/http';
const state = {
  tables: {
  },
  seats: []
};

const mutations = {
  setTables(state, seats) {
    const tables = {};
    if (seats && Array.isArray(seats)) {
      seats.forEach((seat) => {
        const number = seat.number;
        const tableId = number.slice(0, number.length - 1);
        if (!tables[tableId]) {
          tables[tableId] = [];
        }
        tables[tableId].push(seat);
      });
      state.tables = {...tables};
    }
  },
  setSeats(state, seats) {
    state.seats = seats;
  },
  addTable(state) {
    const tables = state.tables;
    const tableId = Object.keys(state.tables).length + 1;
    tables[tableId] = [];
    state.tables = { ...tables };
  }
};

const actions = {
  async getSeats({state, commit}, payload) {
    const { data: { data } } = await http.getSeats(payload);
    commit('setTables', data);
    commit('setSeats', data);
  },
  async deleteTable({state, commit}, tableId) {
    const toDeleteSeats = state.tables[tableId];
    const promises = [];
    toDeleteSeats.forEach(({seat_id: seatId}) => {
      try {
        const promise = http.deleteSeat(seatId);
        promises.push(promise);
        const seats = state.seats;
        for (let i = seats.length - 1; i >= 0; i--) {
          if (seats[i].seat_id === seatId) {
            seats.splice(i, 1);
            break;
          }
        }
        state.seats = [...seats];
      } catch (e) {
        console.log(e);
      }
    });
    await Promise.all(promises);
    const tables = state.tables;
    delete tables[tableId];
    state.tables = {...tables};
  },
  async addSeat({state, commit}, payload) {
    const { tableKey: tableId, merchant_id: merchantId } = payload;
    const number = tableId + String.fromCharCode(state.tables[tableId].length + 65);
    try {
      const { data: { data } } = await http.addSeat({
        seat_id: null,
        number,
        qr_code_url: 'https://www.baidu.com',
        merchant_id: merchantId
      });
      state.seats.push(data);
      state.tables[tableId].push(data);
    } catch (e) {
    }
  },
  async deleteSeat({state, commit}, tableId) {
    if (!state.tables[tableId].length) {
      return;
    }
    const seatId = state.seats[state.seats.length - 1].seat_id;
    try {
      await http.deleteSeat(seatId);
      state.seats.pop();
      state.tables[tableId].pop();
    } catch (e) {
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
