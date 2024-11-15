from flask import Flask, request, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        content = file.read().decode('utf-8')
        tasks = []
        lines = content.splitlines()
        main_task_index = 0

        for line in lines:
            if line.startswith('*'):
                main_task_index += 1
                tasks.append({"id": main_task_index, "title": line[1:].strip(), "subtasks": []})
            elif line.startswith('-') and tasks:
                tasks[-1]["subtasks"].append(line[1:].strip())
        
        return render_template('tasks.html', tasks=tasks)
    return redirect('/')

def parse_tasks(content):
    lines = content.splitlines()
    tasks = []
    current_task = None

    for line in lines:
        if line.startswith('*'):
            if current_task:
                tasks.append(current_task)
            current_task = {"title": line[1:].strip(), "subtasks": []}
        elif line.startswith('-') and current_task:
            current_task["subtasks"].append(line[1:].strip())

    if current_task:
        tasks.append(current_task)
    
    return tasks

if __name__ == '__main__':
    app.run(debug=True)
