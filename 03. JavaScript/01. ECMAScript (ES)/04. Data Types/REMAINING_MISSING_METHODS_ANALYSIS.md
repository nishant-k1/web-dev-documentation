# Remaining Missing Methods Analysis

**Focus:** Important methods missing from interview perspective

---

## 🔍 **Analysis of Missing Methods**

### **1. String Methods** ⚠️ **MEDIUM PRIORITY**

**Missing from `15. String.md`:**

| Method                                 | ES Version | Interview Relevance | Real Dev Relevance   |
| -------------------------------------- | ---------- | ------------------- | -------------------- |
| `matchAll(regex)`                      | ES2020     | ⭐⭐⭐ Medium       | ⭐⭐⭐⭐ High        |
| `padStart(length, padStr)`             | ES2017     | ⭐⭐⭐⭐ High       | ⭐⭐⭐⭐⭐ Very High |
| `padEnd(length, padStr)`               | ES2017     | ⭐⭐⭐⭐ High       | ⭐⭐⭐⭐⭐ Very High |
| `normalize(form?)`                     | ES6        | ⭐⭐ Low            | ⭐⭐⭐ Medium        |
| `localeCompare(str2, locale, options)` | ES6        | ⭐⭐ Low            | ⭐⭐⭐⭐ High (i18n) |

**Why Important:**

- `padStart/padEnd` - Frequently asked for formatting (leading zeros, alignment)
- `matchAll` - Better than repeated exec() loops
- `localeCompare` - Important for internationalization

---

### **2. Promise Static Methods** ⚠️ **HIGH PRIORITY**

**Need to verify coverage in async handling folder:**

| Method                         | ES Version | Interview Relevance  | Real Dev Relevance   |
| ------------------------------ | ---------- | -------------------- | -------------------- |
| `Promise.all(promises)`        | ES6        | ⭐⭐⭐⭐⭐ Very High | ⭐⭐⭐⭐⭐ Very High |
| `Promise.race(promises)`       | ES6        | ⭐⭐⭐⭐⭐ Very High | ⭐⭐⭐⭐⭐ Very High |
| `Promise.allSettled(promises)` | ES2020     | ⭐⭐⭐⭐ High        | ⭐⭐⭐⭐⭐ Very High |
| `Promise.any(promises)`        | ES2021     | ⭐⭐⭐⭐ High        | ⭐⭐⭐⭐ High        |
| `Promise.resolve(value)`       | ES6        | ⭐⭐⭐ Medium        | ⭐⭐⭐⭐ High        |
| `Promise.reject(reason)`       | ES6        | ⭐⭐⭐ Medium        | ⭐⭐⭐⭐ High        |

**Why Critical:**

- `Promise.all` and `Promise.race` - **Most frequently asked** in interviews
- `Promise.allSettled` - Important for error handling (doesn't fail fast)
- `Promise.any` - Newer, but increasingly important

---

### **3. Number Methods** ⚠️ **MEDIUM PRIORITY**

**Need to verify coverage:**

| Method/Property               | ES Version | Interview Relevance | Real Dev Relevance |
| ----------------------------- | ---------- | ------------------- | ------------------ |
| `Number.isInteger(value)`     | ES6        | ⭐⭐⭐ Medium       | ⭐⭐⭐⭐ High      |
| `Number.isSafeInteger(value)` | ES6        | ⭐⭐ Low            | ⭐⭐⭐ Medium      |
| `Number.MAX_SAFE_INTEGER`     | ES6        | ⭐⭐ Low            | ⭐⭐⭐ Medium      |
| `Number.MIN_SAFE_INTEGER`     | ES6        | ⭐⭐ Low            | ⭐⭐⭐ Medium      |
| `Number.isNaN(value)`         | ES6        | ⭐⭐⭐ Medium       | ⭐⭐⭐⭐ High      |
| `Number.isFinite(value)`      | ES6        | ⭐⭐⭐ Medium       | ⭐⭐⭐⭐ High      |

**Why Important:**

- `Number.isInteger` - Common type checking question
- `Number.isNaN` - Better than global `isNaN()` (doesn't coerce)
- Safe integers important for BigInt discussions

---

### **4. Symbol Methods** ⚠️ **MEDIUM PRIORITY**

**Need to verify coverage in Symbols folder:**

| Method                   | ES Version | Interview Relevance | Real Dev Relevance |
| ------------------------ | ---------- | ------------------- | ------------------ |
| `Symbol.for(key)`        | ES6        | ⭐⭐⭐ Medium       | ⭐⭐⭐ Medium      |
| `Symbol.keyFor(sym)`     | ES6        | ⭐⭐ Low            | ⭐⭐⭐ Medium      |
| `Symbol.iterator`        | ES6        | ⭐⭐⭐⭐ High       | ⭐⭐⭐⭐ High      |
| `Symbol.toPrimitive`     | ES6        | ⭐⭐⭐ Medium       | ⭐⭐⭐ Medium      |
| Other well-known symbols | ES6        | ⭐⭐ Low            | ⭐⭐ Low           |

**Why Important:**

- `Symbol.for` - Global symbol registry, frequently asked
- `Symbol.iterator` - Critical for understanding iterables (already covered in iterables folder)

---

### **5. Array Static Methods** ✅ **CHECKED - COVERED**

- `Array.from()` - ✅ Covered
- `Array.of()` - ✅ Covered
- `Array.isArray()` - ✅ Covered

---

### **6. Object Methods** ✅ **CHECKED - COVERED**

- All important methods covered in Objects.md

---

## 📊 **Priority Ranking**

### **🔴 HIGH PRIORITY (Add Soon)**

1. **Promise Static Methods** (if not in async handling folder)

   - `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`
   - **Most frequently asked** in interviews

2. **String.padStart/padEnd**
   - Very common formatting question
   - Simple to add

---

### **🟡 MEDIUM PRIORITY (Consider Adding)**

3. **String.matchAll**

   - Better than exec() loops
   - ES2020 feature

4. **Number.isInteger/isNaN/isFinite**

   - Common type checking
   - Better than global versions

5. **Symbol.for/Symbol.keyFor**
   - Global symbol registry
   - Moderate interview relevance

---

### **🟢 LOW PRIORITY (Optional)**

6. **String.normalize**

   - Unicode normalization
   - Rarely asked

7. **String.localeCompare**

   - Important for i18n, but rarely asked in interviews

8. **Number safe integer methods**
   - Related to BigInt
   - Rarely asked directly

---

## 🎯 **Recommendations**

### **Immediate Actions:**

1. ✅ **Check Promise methods** - Verify if covered in async handling folder

   - If not covered, add comprehensive Promise static methods guide

2. ✅ **Add String.padStart/padEnd** - Quick win, high interview relevance

   - Add to String.md transformation section

3. ⚠️ **Add String.matchAll** - If time permits

   - Add to String.md searching section

4. ⚠️ **Add Number.isInteger/isNaN** - If time permits

   - Could add to Number section or create Number.md

5. ⚠️ **Add Symbol.for** - If time permits
   - Check if in Symbols folder, if not add

---

## ✅ **Quick Checklist**

- [ ] Promise.all/race/allSettled/any - Check async folder
- [ ] String.padStart - Add to String.md
- [ ] String.padEnd - Add to String.md
- [ ] String.matchAll - Add to String.md (optional)
- [ ] Number.isInteger - Verify/Add
- [ ] Number.isNaN - Verify/Add
- [ ] Symbol.for - Check Symbols folder

---

## 📝 **Conclusion**

**Most Critical Missing:**

1. Promise static methods (if not in async folder)
2. String.padStart/padEnd

**Nice to Have:** 3. String.matchAll 4. Number.isInteger/isNaN 5. Symbol.for

Overall, coverage is excellent (97%). The missing items are mostly nice-to-have enhancements rather than critical gaps.
