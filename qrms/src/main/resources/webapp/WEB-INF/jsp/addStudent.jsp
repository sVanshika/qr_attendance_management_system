<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Add Student</h2>
        <form:form action="/course/save" method="post" modelAttribute="student">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <form:input path="name" class="form-control" id="name" required="true" />
            </div>
            <div class="mb-3">
                <label for="rollNumber" class="form-label">Roll Number</label>
                <form:input path="rollNumber" class="form-control" id="rollNumber" required="true" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <form:input path="email" class="form-control" id="email" required="true" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form:form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
