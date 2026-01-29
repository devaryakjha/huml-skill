# HUML v0.2.0 Specification

This document contains the complete HUML (Human-oriented Markup Language) v0.2.0 specification.

## Encoding and Structure

- **Encoding:** UTF-8
- **Line breaks:** Unix-style (`\n`)
- **Version directive:** Optional `%HUML v0.2.0` at document start. If absent, defaults to latest spec version.

## Data Types

### Strings

**Single-line strings:** Must be double-quoted. Backslash (`\`) and double-quote (`"`) require escaping.

```huml
name: "John Doe"
path: "C:\\Users\\john"
quote: "He said \"hello\""
```

**Escape sequences:**
- `\\` - backslash
- `\"` - double quote
- `\n` - newline
- `\t` - tab
- `\r` - carriage return

**Multi-line strings:** Use triple double-quotes (`"""`). Content is preserved literally without escaping.

```huml
description: """
  This is a multi-line string.
  Special chars like \ and " don't need escaping.
  Indentation beyond the minimum 2 spaces is preserved.
"""
```

Multi-line string rules:
- Content must be indented 2 spaces relative to the key
- The initial 2-space indentation on each line is the minimum required and is NOT preserved
- Additional indentation beyond 2 spaces IS preserved as content
- Trailing spaces are preserved within multiline strings

### Numbers

**Integers:**
```huml
positive: 123
negative: -123
explicit_positive: +123
```

**Floats:**
```huml
decimal: 3.14
negative_float: -0.5
```

**Scientific notation:**
```huml
large: 1e10
small: 1.5e-3
explicit: 2.5E+6
```

**Special values:**
```huml
not_a_number: nan
infinity: inf
positive_inf: +inf
negative_inf: -inf
```

**Alternative bases:**
```huml
hexadecimal: 0x1A3F
octal: 0o755
binary: 0b1010
```

**Underscores:** Ignored within numbers for readability.
```huml
big_number: 1_000_000
hex_bytes: 0xFF_FF_FF
```

### Booleans

```huml
enabled: true
disabled: false
```

### Null

```huml
value: null
```

## Vectors (Collections)

HUML uses the term "vector" for collections. There are two types: lists (arrays) and dicts (maps/objects).

### Key Syntax

- **Single colon `:`** - value is a scalar (string, number, boolean, null)
- **Double colon `::`** - value is a vector (list or dict)

### Lists

**Inline syntax:** Comma-separated values in a single line.
```huml
numbers:: 1, 2, 3
mixed:: "a", 1, true, null
```

**Multiline syntax:** Each item prefixed with hyphen (`-`).
```huml
items::
  - "first"
  - "second"
  - "third"
```

**Empty list:**
```huml
empty:: []
```

**Nested lists (multiline only):**
```huml
matrix::
  -
    - 1
    - 2
  -
    - 3
    - 4
```

### Dicts

**Inline syntax:** Comma-separated key-value pairs.
```huml
point:: x: 1, y: 2
```

**Multiline syntax:** Standard indented key-value pairs.
```huml
person::
  name: "Alice"
  age: 30
```

**Empty dict:**
```huml
empty:: {}
```

**Nested dicts:**
```huml
config::
  database::
    host: "localhost"
    port: 5432
  cache::
    enabled: true
```

### Nesting Rules

- **Inline vectors** CANNOT contain nested vectors or dicts
- **Multiline vectors** permit arbitrary nesting

```huml
# Valid - multiline with nesting
servers::
  - name: "web1"
    port: 8080
  - name: "web2"
    port: 8081

# Invalid - inline cannot nest
# servers:: name: "web1", port: 8080  <-- ERROR
```

## Key Naming Rules

**Unquoted keys:**
- Must start with a letter (a-z, A-Z)
- Can contain letters, digits, underscores (`_`), and hyphens (`-`)
- Case-sensitive

```huml
valid_key: "value"
another-key: "value"
Key123: "value"
```

**Quoted keys:** Use double quotes for keys with special characters.
```huml
"key with spaces": "value"
"123-numeric-start": "value"
```

## Indentation

- **Strictly 2 spaces** per level
- Tabs are NOT allowed
- Indentation defines hierarchy in multiline structures

```huml
level1::
  level2::
    level3: "deep"
```

## Spacing Rules

- **Single space required** after `:`, `::`, and `-`
- **No space before** colons
- **Commas** in inline vectors: no preceding space, exactly one following space
- **Trailing spaces** are prohibited (except within multiline strings)

```huml
# Correct
key: "value"
list:: 1, 2, 3

# Incorrect
key : "value"    # space before colon
key:  "value"    # two spaces after colon
list:: 1 , 2,3   # space before comma, no space after
```

## Comments

- Lines beginning with `#` are ignored
- **Space required** after `#`
- Inline comments are allowed

```huml
# This is a comment
name: "value"  # inline comment

#This is invalid - needs space after #
```

## Document Root

The document root doesn't require colons - the type is inferred from the first encountered value.

**Root is a dict:**
```huml
name: "App"
version: "1.0"
```

**Root is a list:**
```huml
- "item1"
- "item2"
```

## Complete Example

```huml
%HUML v0.2.0

# Application configuration
app::
  name: "MyApp"
  version: "2.1.0"
  debug: false

# Database settings
database::
  host: "localhost"
  port: 5432
  credentials::
    username: "admin"
    password: "secret123"

# Feature flags
features:: "auth", "logging", "cache"

# Servers list
servers::
  - name: "primary"
    host: "192.168.1.1"
    port: 8080
  - name: "backup"
    host: "192.168.1.2"
    port: 8081

# Multi-line description
notes: """
  This configuration file demonstrates
  various HUML features including:
  - Nested structures
  - Inline and multiline vectors
  - Comments and multi-line strings
"""
