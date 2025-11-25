from flask import Flask, render_template, request, redirect, url_for

# Create Flask application instance
app = Flask(__name__)

# In‑memory storage for guestbook entries (list of names)
guest_entries = []


@app.route('/', methods=['GET', 'POST'])
def index():
    """Render the guestbook page and handle new entry submissions.

    - GET: Render ``templates/index.html`` with the current ``guest_entries``.
    - POST: Retrieve ``name`` from the submitted form, validate it, store it in
      ``guest_entries`` and redirect back to the GET view to prevent duplicate
      submissions.
    """
    if request.method == 'POST':
        # Retrieve the submitted name; ``None`` if the field is missing.
        name = request.form.get('name')
        # Only store non‑empty names.
        if name:
            guest_entries.append(name)
        # Redirect to the GET version of the route.
        return redirect(url_for('index'))

    # For GET requests, render the template with the current entries.
    return render_template('index.html', guest_entries=guest_entries)


if __name__ == "__main__":
    # Run the Flask development server with debug mode enabled.
    app.run(debug=True)
