
export class myFetch {
  constructor(url) {
    this.url = url + "";
  }


  async get() {

    try {

      let response = await fetch(this.url);
      if(response.status == 200){
        return await response.json();
      }
      else{
        return await response.status;
      }
    } catch(err) {

console.log(err);
      console.log(err+"!!");
      return "Failed";
    }
  }

  async post(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (err) {
      alert("Try Again !!");
    }
  }

  async put(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "PUT",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if(response.status == 200){
        return await response.json();
      }
      else{
        return await response.status;
      }
    } catch (err) {
      return await response.status;
    }
  }

  async patch(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "PATCH",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if(response.status == 200){
        return await response.json();
      }
      else{
      return await response.status;
    }
    } catch (err) {
      return await response.status;
    }
  }

  async delete() {
    try {
      let response = await fetch(this.url, {
        method: "DELETE",
      });
      return "Deleted";
    } catch {
      alert("Try Again !!");
    }
  }
}
