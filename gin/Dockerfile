FROM golang:1.20

WORKDIR /gin

COPY go.mod .
COPY go.sum .

RUN go mod tidy
RUN go mod download

EXPOSE 8080

RUN go install github.com/ramya-rao-a/go-outline@latest
RUN go install golang.org/x/tools/gopls@latest
RUN go install github.com/cosmtrek/air@latest
CMD ["air"]