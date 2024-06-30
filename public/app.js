document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '<h2>Loading users...</h2>';

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            let userHTML = '<h2>Users</h2><ul>';
            users.forEach(user => {
                userHTML += `<li>${user.name} (${user.email})</li>`;
            });
            userHTML += '</ul>';
            app.innerHTML = userHTML;
        });
});