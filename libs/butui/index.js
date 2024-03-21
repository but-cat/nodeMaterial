import { openBlock as d, createElementBlock as i, defineComponent as f, normalizeClass as u, createElementVNode as n, computed as b, resolveComponent as w, toDisplayString as m, createVNode as g, withCtx as h, withDirectives as B, renderSlot as v, vShow as k, pushScopeId as P, popScopeId as D, createCommentVNode as C, createBlock as _, Teleport as E, withModifiers as S, Transition as y } from "vue";
const c = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, a] of t)
    s[o] = a;
  return s;
}, L = {}, I = { class: "h-8 px-3 rounded-md shadow text-white bg-blue-500" };
function M(e, t) {
  return d(), i("button", I, "\u6211\u662F\u6309\u9215");
}
const Se = /* @__PURE__ */ c(L, [["render", M], ["__scopeId", "data-v-f138964f"]]);
const O = f({
  name: "oSwitch",
  emits: ["update:value"],
  props: {
    value: {
      type: [Boolean, String, Number],
      default: !1
    },
    type: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    disableds() {
      return this.disabled ? "disableds" : "";
    },
    valueData() {
      switch (typeof this.value) {
        case "string":
          return this.value === "true";
        case "number":
          return this.value === 1;
        case "boolean":
          return this.value;
        default:
          return !1;
      }
    }
  },
  methods: {
    toggle() {
      switch (typeof this.value) {
        case "string":
          return this.$emit("update:value", this.value === "true" ? "false" : "true");
        case "number":
          return this.$emit("update:value", this.value === 1 ? 0 : 1);
        case "boolean":
          return this.$emit("update:value", !this.value);
        default:
          return this.$emit("update:value", !1);
      }
    }
  }
});
function V(e, t, s, o, a, r) {
  return d(), i("div", {
    class: u([[e.type, e.disabled ? "disableds" : ""], "switch"]),
    onClick: t[0] || (t[0] = (...l) => e.toggle && e.toggle(...l))
  }, [
    n("div", {
      class: u([[e.valueData ? "no" : "off", e.disableds], "bar"])
    }, null, 2),
    n("div", {
      class: u([[e.valueData ? "no" : "off"], "container"])
    }, null, 2)
  ], 2);
}
const A = /* @__PURE__ */ c(O, [["render", V], ["__scopeId", "data-v-e575f339"]]), F = f({
  name: "oSelect",
  emits: ["update:value", "open", "close"],
  props: {
    placeholder: {
      value: String,
      default: ""
    },
    value: {
      value: [String, Array],
      default: ""
    },
    multiple: Boolean
  },
  data: () => ({
    open: !1,
    name: ""
  }),
  provide() {
    return {
      selectedData: b(() => this.value)
    };
  },
  methods: {
    selectChangeVal(e) {
      e.stopPropagation(), this.name = e.name, this.$emit("update:value", e.value), this.open = !1;
    },
    selecteds(e) {
      e.stopPropagation(), this.name = e.name;
    }
  },
  watch: {
    open() {
      this.open ? this.$emit("open") : this.$emit("close");
    }
  }
});
const j = ["placeholder"], N = {
  key: 0,
  class: "text-sm"
}, z = {
  key: 1,
  class: "text-gray-400 text-sm"
};
function H(e, t, s, o, a, r) {
  const l = w("e-collapse");
  return d(), i("div", {
    class: "o-select dowebok",
    onBlur: t[3] || (t[3] = (p) => e.open = !1),
    tabindex: "1",
    ref: "list"
  }, [
    n("span", {
      onClick: t[0] || (t[0] = (p) => e.open = !e.open),
      placeholder: e.placeholder,
      class: u([e.open ? "is-open" : "", "content"])
    }, [
      e.name ? (d(), i("span", N, m(e.name), 1)) : (d(), i("span", z, m(e.placeholder), 1))
    ], 10, j),
    g(l, null, {
      default: h(() => [
        B(n("ul", {
          onSelected: t[1] || (t[1] = (...p) => e.selecteds && e.selecteds(...p)),
          onSelect: t[2] || (t[2] = (...p) => e.selectChangeVal && e.selectChangeVal(...p))
        }, [
          v(e.$slots, "default", {}, void 0, !0)
        ], 544), [
          [k, e.open]
        ])
      ]),
      _: 3
    })
  ], 544);
}
const U = /* @__PURE__ */ c(F, [["render", H], ["__scopeId", "data-v-89405787"]]), q = f({
  name: "oSelectCard",
  emits: ["update:value", "open", "close"],
  props: {
    placeholder: {
      value: String,
      default: ""
    },
    value: {
      value: [String, Array],
      default: ""
    },
    multiple: Boolean,
    disabled: {
      value: Boolean,
      default: !1
    }
  },
  data: () => ({
    open: !1,
    name: ""
  }),
  provide() {
    return {
      selectedData: b(() => this.value)
    };
  },
  methods: {
    selectChangeVal(e) {
      e.stopPropagation(), this.name = e.name, this.$emit("update:value", e.value), this.open = !1;
    },
    selecteds(e) {
      e.stopPropagation(), this.name = e.name;
    }
  },
  watch: {
    open() {
      this.open ? this.$emit("open") : this.$emit("close");
    },
    value: {
      handler(e) {
        this.$nextTick(() => {
          var s;
          this.name = "";
          const t = new Event("change-val");
          (s = this.$refs.optionList) == null || s.dispatchEvent(t);
        });
      },
      immediate: !0
    }
  }
});
const T = (e) => (P("data-v-54a4717a"), e = e(), D(), e), R = ["placeholder"], G = {
  key: 0,
  class: "text-sm"
}, J = {
  key: 1,
  class: "text-gray-400 text-sm"
}, K = /* @__PURE__ */ T(() => /* @__PURE__ */ n("div", {
  class: "absolute z-10 top-0 left-0 w-full h-10 bg-gradient-to-b from-gray-50 via-gray-50 rounded-t-xl pointer-events-none",
  "data-v-e72b1c36": ""
}, null, -1)), Q = /* @__PURE__ */ T(() => /* @__PURE__ */ n("div", {
  class: "absolute z-10 bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-50 via-gray-50 rounded-t-xl pointer-events-none",
  "data-v-e72b1c36": ""
}, null, -1));
function W(e, t, s, o, a, r) {
  const l = w("o-modal-popup");
  return d(), i("div", {
    class: u([e.disabled ? "opacity-50" : "", "o-select-card dowebok"]),
    tabindex: "1",
    ref: "list"
  }, [
    n("span", {
      onClick: t[0] || (t[0] = () => {
        e.disabled || (e.open = !e.open);
      }),
      placeholder: e.placeholder,
      class: u([e.open ? "is-open" : "", "content"])
    }, [
      e.name ? (d(), i("span", G, m(e.name), 1)) : (d(), i("span", J, m(e.placeholder), 1))
    ], 10, R),
    g(l, {
      open: e.open,
      "onUpdate:open": t[3] || (t[3] = (p) => e.open = p)
    }, {
      default: h(() => [
        K,
        n("ul", {
          onSelected: t[1] || (t[1] = (...p) => e.selecteds && e.selecteds(...p)),
          onSelect: t[2] || (t[2] = (...p) => e.selectChangeVal && e.selectChangeVal(...p)),
          ref: "optionList",
          class: "select-list divide-y pb-6 bg-gray-50"
        }, [
          v(e.$slots, "default", {}, void 0, !0)
        ], 544),
        Q
      ]),
      _: 3
    }, 8, ["open"])
  ], 2);
}
const X = /* @__PURE__ */ c(q, [["render", W], ["__scopeId", "data-v-54a4717a"]]), Y = f({
  name: "oSelectOption",
  inject: ["selectedData"],
  props: {
    value: {
      value: [String, Boolean, Number],
      default: !1
    }
  },
  computed: {
    choice() {
      return this.value === this.selectedData;
    }
  },
  methods: {
    selecteds() {
      var e, t, s, o;
      if (this.selectedData === this.value) {
        const a = new CustomEvent("selected", { bubbles: !0, cancelable: !0 });
        a.value = this.value, a.name = (t = (e = this.$refs) == null ? void 0 : e.li) == null ? void 0 : t.innerText, (o = (s = this.$refs) == null ? void 0 : s.li) == null || o.dispatchEvent(a);
      }
    },
    click() {
      var t, s, o, a;
      const e = new CustomEvent("select", { bubbles: !0, cancelable: !0 });
      e.value = this.value, e.name = (s = (t = this.$refs) == null ? void 0 : t.li) == null ? void 0 : s.innerText, (a = (o = this.$refs) == null ? void 0 : o.li) == null || a.dispatchEvent(e);
    }
  },
  watch: {
    value() {
      var e;
      (e = this.$refs) != null && e.li && this.selecteds();
    },
    selectedData() {
      var e;
      (e = this.$refs) != null && e.li && this.selecteds();
    }
  },
  mounted() {
    var e, t;
    (e = this.$refs) != null && e.li && this.selecteds(), (t = this.$refs) == null || t.li.parentElement.addEventListener("change-val", this.selecteds.bind(this));
  }
});
function Z(e, t, s, o, a, r) {
  return d(), i("li", {
    onClick: t[0] || (t[0] = (...l) => e.click && e.click(...l)),
    class: u([e.choice && "text-blue-400", "o-option py-2 text-sm text-center"]),
    ref: "li"
  }, [
    n("span", null, [
      v(e.$slots, "default", {}, void 0, !0)
    ])
  ], 2);
}
const x = /* @__PURE__ */ c(Y, [["render", Z], ["__scopeId", "data-v-85d6ffe4"]]), ee = f({
  name: "oUploadImage",
  emits: ["update:value"],
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    file: null,
    url: ""
  }),
  methods: {
    async upload(e) {
      try {
        const t = e.target.files[0];
        if (t instanceof File && t.size > 10 * 1024 * 1024)
          throw new Error("\u56FE\u7247\u4E0D\u80FD\u5927\u4E8E10M!");
        console.log("upload file", t.name);
        const s = new FormData();
        s.append("file", t), s.append("name", t.name || "file");
        const o = await this.$http({
          url: "/sys/common/upload",
          method: "post",
          data: s,
          onUploadProgress: ({ total: a, loaded: r }) => {
            let l = Math.ceil(r / a * 100);
            l = l <= 100 ? l : 100, console.log("????", l);
          },
          transformRequest: [function(a, r) {
            return delete r.post["Content-Type"], a;
          }]
        });
        this.$emit("update:value", o.message), console.log("update:value", o.message);
      } catch (t) {
        console.log(t);
      }
    }
  }
}), te = { class: "w-full p-2 rounded-lg bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" }, se = { class: "flex items-center justify-center h-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-gray-400 text-md font-semibold bg-gray-100 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-md" }, oe = {
  key: 0,
  class: "title"
}, ae = { class: "input" }, ne = {
  key: 0,
  class: "content"
}, le = /* @__PURE__ */ n("span", null, "\u70B9\u6B64\u4E0A\u4F20\u8BC1\u4EF6", -1), de = [
  le
], ie = ["src"], re = {
  ref: "input",
  type: "file",
  accept: "image/*",
  style: { display: "none" }
};
function pe(e, t, s, o, a, r) {
  return d(), i("div", te, [
    n("div", {
      onClick: t[0] || (t[0] = (l) => !e.disabled && e.$refs.file.click()),
      class: u([!e.disabled, "p-1 flex-grow"])
    }, [
      n("div", se, [
        e.title ? (d(), i("p", oe, m(e.title), 1)) : C("", !0),
        n("div", ae, [
          e.value ? (d(), i("img", {
            key: 1,
            class: "w-full h-48 object-cover",
            src: e.value,
            alt: "img"
          }, null, 8, ie)) : (d(), i("div", ne, de))
        ])
      ])
    ], 2),
    n("input", re, null, 512),
    n("input", {
      onChange: t[1] || (t[1] = (...l) => e.upload && e.upload(...l)),
      ref: "file",
      type: "file",
      accept: "image/*",
      style: { display: "none" }
    }, null, 544)
  ]);
}
const ue = /* @__PURE__ */ c(ee, [["render", pe]]), ce = f({
  name: "oModalBlock",
  emits: ["update:open"],
  props: {
    open: {
      type: Boolean,
      default: !1
    }
  }
});
const fe = {
  key: 0,
  class: "model"
}, ve = { class: "content" };
function me(e, t, s, o, a, r) {
  return d(), _(E, { to: "body" }, [
    n("div", {
      class: u(["address_model", e.open && "open"]),
      onClick: t[0] || (t[0] = S((l) => e.$emit("update:open", !1), ["prevent", "self"]))
    }, [
      g(y, { name: "model" }, {
        default: h(() => [
          e.open ? (d(), i("div", fe, [
            n("div", ve, [
              v(e.$slots, "default", {}, void 0, !0)
            ])
          ])) : C("", !0)
        ]),
        _: 3
      })
    ], 2)
  ]);
}
const he = /* @__PURE__ */ c(ce, [["render", me], ["__scopeId", "data-v-9b8f6318"]]), ge = f({
  name: "oModalPopup",
  emits: ["update:open"],
  props: {
    open: {
      type: Boolean,
      default: !1
    },
    data: {
      type: String
    }
  }
});
const _e = { class: "model" }, ye = { class: "content" };
function $e(e, t, s, o, a, r) {
  return d(), _(E, { to: "body" }, [
    n("div", {
      class: u(["address_model", e.open && "open"]),
      onClick: t[0] || (t[0] = S((l) => e.$emit("update:open", !1), ["prevent", "self"]))
    }, [
      g(y, { name: "model" }, {
        default: h(() => [
          B(n("div", _e, [
            n("div", ye, [
              v(e.$slots, "default", {}, void 0, !0)
            ])
          ], 512), [
            [k, e.open]
          ])
        ]),
        _: 3
      })
    ], 2)
  ]);
}
const be = /* @__PURE__ */ c(ge, [["render", $e], ["__scopeId", "data-v-66477c09"]]), $ = "0.2s height ease-in-out, 0.2s padding-top ease-in-out, 0.2s padding-bottom ease-in-out", we = f({
  name: "eCollapse",
  functional: !0,
  methods: {
    beforeEnter(e) {
      e.style.transition = $, e.dataset || (e.dataset = {}), e.dataset.oldPaddingTop = e.style.paddingTop, e.dataset.oldPaddingBottom = e.style.paddingBottom, e.style.height = "0", e.style.paddingTop = "0", e.style.paddingBottom = "0";
    },
    enter(e) {
      e.dataset.oldOverflow = e.style.overflow, e.scrollHeight !== 0 ? (e.style.height = e.scrollHeight + "px", e.style.paddingTop = e.dataset.oldPaddingTop, e.style.paddingBottom = e.dataset.oldPaddingBottom) : (e.style.height = "", e.style.paddingTop = e.dataset.oldPaddingTop, e.style.paddingBottom = e.dataset.oldPaddingBottom), e.style.overflow = "hidden";
    },
    afterEnter(e) {
      e.style.transition = "", e.style.height = "", e.style.overflow = e.dataset.oldOverflow;
    },
    beforeLeave(e) {
      e.dataset || (e.dataset = {}), e.dataset.oldPaddingTop = e.style.paddingTop, e.dataset.oldPaddingBottom = e.style.paddingBottom, e.dataset.oldOverflow = e.style.overflow, e.style.height = e.scrollHeight + "px", e.style.overflow = "hidden";
    },
    leave(e) {
      e.scrollHeight !== 0 && (e.style.transition = $, e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0);
    },
    afterLeave(e) {
      e.style.transition = "", e.style.height = "", e.style.overflow = e.dataset.oldOverflow, e.style.paddingTop = e.dataset.oldPaddingTop, e.style.paddingBottom = e.dataset.oldPaddingBottom;
    }
  }
});
function Be(e, t, s, o, a, r) {
  return d(), _(y, {
    onEnter: e.enter,
    onBeforeEnter: e.beforeEnter,
    onBeforeLeave: e.beforeLeave,
    onLeave: e.leave,
    onAfterEnter: e.afterEnter,
    onAfterLeave: e.afterLeave
  }, {
    default: h(() => [
      v(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["onEnter", "onBeforeEnter", "onBeforeLeave", "onLeave", "onAfterEnter", "onAfterLeave"]);
}
const ke = /* @__PURE__ */ c(we, [["render", Be]]), Ce = {
  oSwitch: A,
  oSelect: U,
  selectCard: X,
  oSelectOption: x,
  eCollapse: ke,
  oModal: he,
  oModalPopup: be,
  oUpImage: ue
}, Te = {
  install: (e) => {
    Object.entries(Ce).forEach(([t, s]) => {
      var o;
      e.component((o = s.name) != null ? o : t, s);
    });
  }
};
export {
  Se as MyButton,
  Te as default,
  ke as eCollapse,
  he as oModal,
  be as oModalPopup,
  U as oSelect,
  x as oSelectOption,
  A as oSwitch,
  ue as oUpImage,
  X as selectCard
};
