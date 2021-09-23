/**
 * @author angeljsb
 */

/**
 * Espacio de nombre que guarda la funcionalidad para las request
 * a la api
 *
 * @namespace
 */
const Api = {
  host: "http://localhost:8080/BookApi/",
};

/**
 * Objeto que define una ruta de la api y permite hacer requests
 * de los cuatro tipos aceptados: "GET", "POST", "PUT", "DELETE"
 *
 * @param {*} config Objeto de configuración
 *
 * @constructor
 */
Api.Route = function (config = {}) {
  this.path = config.path;
  this._params = new URLSearchParams();
  this._body = {};
};

Api.Route.constructor = Api.Route;
Api.Route.prototype = {
  sendRequest: async function (endpoint, data, content = "application/json") {
    const res = await fetch(Api.host + "api/" + endpoint, {
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": content + "; charset=UTF-8",
        "Accept-Encoding": "*",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      ...data,
    });
    return res;
  },
  /**
   * Añade parametros al query de la consulta
   *
   * @param {*} params Un objeto con los parametros a añadir en el
   * query del url
   * @returns El objeto this para seguir construyendo la consulta
   * @function
   */
  params: function (params = {}) {
    this._params = new URLSearchParams();
    for (let i in params) {
      if (params[i] instanceof Array) {
        params[i].forEach((val) => this.addParam(i, val));
      } else {
        this.addParam(i, params[i]);
      }
    }
    return this;
  },
  /**
   * Añade un parametro al query de la consulta
   * @param {string} key Llave que identifica al parametro
   * @param {*} value Valor del parametro
   * @function
   */
  addParam: function (key, value) {
    this._params.append(key, value);
  },
  /**
   * Cambia el body que será enviado en la request
   *
   * @param {*} body El cuerpo de la consulta. Puede ser un objeto
   * FormData o un objeto a pasar en formato json
   * @returns El objeto this para seguir construyendo la consulta
   * @function
   */
  body: function (body = {}) {
    this._body = body;
    return this;
  },
  /**
   * Realiza una petición GET a la ruta correspondiente a este
   * objeto. Si el objeto tiene un body, este es ignorado
   *
   * @returns La respuesta de la petición
   * @async @function
   */
  get: async function (params = {}) {
    this.params(params);
    let endpoint = this.path;
    if (this._params.toString()) {
      endpoint = endpoint + "?" + this._params.toString();
    }
    return this.sendRequest(endpoint, {
      method: "GET",
    });
  },
  /**
   * Realiza una petición POST a la ruta correspondiente a este
   * objeto, con el body y los parametros correspondientes
   *
   * @returns La respuesta de la petición
   * @async @function
   */
  post: async function (params = {}) {
    this.body(params);
    let endpoint = this.path;
    if (this._params.toString()) {
      endpoint = endpoint + "?" + this._params.toString();
    }
    let body = this._body;
    let content = "multipart/form-data";
    if (!(body instanceof FormData)) {
      body = JSON.stringify(body);
      content = "application/json";
    }
    return this.sendRequest(
      endpoint,
      {
        method: "POST",
        body,
      },
      content
    );
  },
  /**
   * Realiza una petición PUT a la ruta correspondiente a este
   * objeto, con el body y los parametros correspondientes.
   *
   * En realidad, se envía una petición POST con el parametro
   * especial _METHOD = PUT para que el servidor lo interprete
   * como una petición de este tipo
   *
   * @returns La respuesta de la petición
   * @async @function
   */
  put: async function (params = {}) {
    this.body(params);
    this._params.append("_METHOD", "PUT");
    const endpoint = this.path + "?" + this._params.toString();
    let body = this._body;
    let content = "multipart/form-data";
    if (!(body instanceof FormData)) {
      body = JSON.stringify(body);
      content = "application/json";
    }
    return this.sendRequest(
      endpoint,
      {
        method: "POST",
        body,
      },
      content
    );
  },
  /**
   * Realiza una petición DELETE a la ruta correspondiente a este
   * objeto. Si el objeto tiene un body, este es ignorado
   *
   * En realidad, se envía una petición POST con el parametro
   * especial _METHOD = DELETE para que el servidor lo interprete
   * como una petición de este tipo
   *
   * @returns La respuesta de la petición
   * @async @function
   */
  delete: async function (params = {}) {
    this.params(params);
    this._params.append("_METHOD", "DELETE");
    const endpoint = this.path + "?" + this._params.toString();
    return this.sendRequest(endpoint, {
      method: "POST",
    });
  },
};

Api.routes = [
  "users",
  "stories",
  "chapters",
  "genres",
  "sessions",
  "tags",
  "lectures",
  "elements",
];

// No los declaré en un bucle para que fuera más legible
Api.users = new Api.Route({ path: "users" });
Api.stories = new Api.Route({ path: "stories" });
Api.chapters = new Api.Route({ path: "chapters" });
Api.genres = new Api.Route({ path: "genres" });
Api.sessions = new Api.Route({ path: "sessions" });
Api.tags = new Api.Route({ path: "tags" });
Api.lectures = new Api.Route({ path: "lectures" });
Api.elements = new Api.Route({ path: "elements" });

export default Api;
