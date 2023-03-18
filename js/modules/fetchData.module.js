export class FetchData {
  async getTypes(type) {
    if (type == "c") {
      var meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
    } else {
      var meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`
      );
    }

    let response = await meals.json().then((res) => {
      return res;
    });
    return response;
  }
  async getMeals(genre, genreValue) {
    var meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?${genre}=${genreValue}
      `
    );

    let response = await meals.json().then((res) => {
      return res;
    });
    return response;
  }

  async getMealDetails(mealId) {
    var mealDetails = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    let response = await mealDetails.json().then((res) => {
      return res;
    });
    return response;
  }

  async getMealByName(mealName) {
    var mealDetails = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    let response = await mealDetails.json().then((res) => {
      return res;
    });
    return response;
  }

  async getMealByFirstLetter(mealChar) {
    var mealDetails = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealChar}`
    );

    let response = await mealDetails.json().then((res) => {
      return res;
    });
    return response;
  }
}
